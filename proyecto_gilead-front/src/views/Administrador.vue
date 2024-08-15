<template>
    <div>
        <div>
            <v-card class="mx-auto" max-width="900">
                <v-card-text>

                    <v-tabs>
                        <v-tab>Postulantes</v-tab>
                        <v-tab>Miembros</v-tab>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                    <v-data-table :headers="headers" :items="desserts" sort-by="calories"
                                        class="elevation-1">
                                        <template v-slot:top>
                                            <v-toolbar flat>
                                                <v-toolbar-title>Postulantes</v-toolbar-title>
                                                <v-divider class="mx-4" inset vertical></v-divider>
                                                <v-spacer></v-spacer>

                                                <v-dialog v-model="dialogDelete" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="text-h5">Are you sure you want to delete this
                                                            item?</v-card-title>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn color="blue darken-1" text
                                                                @click="closeDelete">Cancel</v-btn>
                                                            <v-btn color="blue darken-1" text
                                                                @click="deleteItemConfirm">OK</v-btn>
                                                            <v-spacer></v-spacer>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </v-toolbar>
                                        </template>
                                        <template v-slot:item.actions="{ item }">
                                            <v-icon small class="mr-2" @click="editItem(item)">
                                                mdi-pencil
                                            </v-icon>
                                            <v-icon small @click="deleteItem(item)">
                                                mdi-delete
                                            </v-icon>
                                        </template>
                                        <template v-slot:no-data>
                                            <v-btn color="primary" @click="initialize">
                                                Reset
                                            </v-btn>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card>

                                <v-card-text>
                                    <v-text-field v-model="correo" filled color="deep-purple" counter="40"
                                        label="Ingresa el correo del miembro" style="min-height: 96px"></v-text-field>
                                    <v-text-field v-model="Nombre" filled color="deep-purple" counter="40"
                                        label="Ingresar el Nombre y apellido del usuario"
                                        style="min-height: 96px"></v-text-field>
                                    <v-btn color="grey" @click="enviarData()">
                                        Generar Token
                                    </v-btn>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>

                </v-card-text>
            </v-card>
        </div>
        <div>
            <template>
                <v-footer dark padless>
                    <v-card class="flex" flat tile>
                        <v-card-title class="teal">
                            <strong class="subheading">Get connected with us on social networks!</strong>

                            <v-spacer></v-spacer>
                        </v-card-title>

                        <v-card-text class="piedepagina">
                            © {{ new Date().getFullYear() }} — <strong text-align="right"> INFECTOCLÍNICOS
                                EN BOGOTÁ. TODOS LOS DERECHOS RESERVADOS. - POWERED BY GJX </strong><v-img class="imagenGJX"
                                src="../assets/gjx.png"></v-img>
                        </v-card-text>

                    </v-card>
                </v-footer>
            </template>
        </div>
    </div>
</template>

<script>
import store from "../store/index.js";
import { mapActions, mapState, mapMutations } from 'vuex';
import axios from "axios";
import emailjs from 'emailjs-com';
import swal from 'sweetalert2';
window.Swal = swal;
export default {
    data: () => ({
        idDelete: "",
        correo: "",
        Nombre: "",
        token: "",
        dialog: false,
        dialogDelete: false,

        headers: [
            { text: 'Correo', value: 'Email', },
            { text: 'Nombres y apellidos', value: 'NombreApellido' },
            { text: 'Info por que ser parte', value: 'SerParte' },

            { text: 'Actions', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            Email: '',
            NombreApellido: '',
            SerParte: '',
        },
        defaultItem: {
            Email: '',
            NombreApellido: '',
            SerParte: '',
        },
    }),

    computed: {
        ...mapState(["infoPostulantreAd", 'DatosClasificacionTipo']),
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },
    beforeMount() {
        store.dispatch("GetDatosPostulantes").then(() => this.initialize())
        store.dispatch('GetDatosClasificacionTipo');
    },

    methods: {

        async enviarData() {
            console.log("Cedula masonicaaaaaaa", this.DatosClasificacionTipo)
            var idtemp = this.DatosClasificacionTipo.filter(tipoid => tipoid.IdClasificacion == 4);
            var dataclass = JSON.parse(JSON.stringify(idtemp));
            var resultados = dataclass[0].text.split('-')
            resultados[1] = Math.floor(resultados[1])
            resultados[1] = resultados[1] + 1
            resultados[1] = resultados[1].toString()
            switch (resultados[1].length) {
                case 1:
                    resultados[1] = "0000" + (resultados[1]).slice(0, 1);
                    break;
                case 2:
                    resultados[1] = "000" + (resultados[1]).slice(0, 2);
                    break;
                case 3:
                    resultados[1] = "00" + (resultados[1]).slice(0, 3);
                    break;
                case 4:
                    resultados[1] = "0" + (resultados[1]).slice(0, 4);
                    break;

            }
            console.log("wiiiiiiiiiiiiii", dataclass)
            resultados = resultados[0] + "-" + resultados[1]
            console.log("Cedula aaaaaa", resultados)
            const data = {

                "data": {
                    "IdClasificacion": dataclass[0].IdClasificacion,
                    "Descripcion": resultados,
                    "Tipo": dataclass[0].value
                }
            }

            function sendcedula(data) {
                axios.put("https://granlogiadecolombia.net:1337/api/tbl-tipo-clasificacions/1", data, {
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(resp => {
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'creacion id user cedula masonica',
                            allowOutsideClick: false,
                            backdrop: false,
                            confirmButtonColor: '#ff0000a8'
                        });
                    });

            }
            function makeid(length) {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const charactersLength = characters.length;
                let counter = 0;
                while (counter < length) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    counter += 1;
                }
                return result;
            }
            let codToken = makeid(10)
            const user = {

                "username": this.Nombre,
                "email": this.correo,
                "password": "GLC2023",
                "Roles": "Miembro",
                "role": "Public",
                "confirmed": false,
                "Token": codToken,
                "CedulaMasonica": resultados

            };
            axios.post("http://granlogiadecolombia.net:1337/api/auth/local/register", user, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    sendcedula(data)
                    this.RegistroExitoso = 1;
                    this.dialog = true;
                    //store.commit('AsignarValorLogin', { ValorLogin: 1 });
                    /*console.log('entro por el ok');
                  console.log("Registro correcto")
                  alert("Usuario registrado con exito, por favor digite sus credenciales para poder ingresar.") */
                    const serviceID = 'service_3x61aur';
                    const templateID = 'template_bm2hnrm';
                    const IdUser = 'DBiMDy6N8p2zoftdn';

                    emailjs.send(serviceID, templateID, {
                        message: codToken,
                        name: this.Nombre,
                        reply_to: "A continuación encontraras en código de verificación para ingreso a nuestra pagina.",
                        email: this.correo,
                    }, IdUser).then(function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                        Swal.fire({
                            icon: 'success',
                            title: 'Correcto',
                            text: 'Enviado correctamente!',
                            confirmButtonColor: '#ff0000a8',
                        })
                    }, function (error) {
                        console.log('FAILED...', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo enviar correctamente!',
                            confirmButtonColor: '#ff0000a8',
                        })
                    });

                })
                .catch(error => {
                    console.log("error:", error)
                    this.RegistroExitoso = 0
                    //store.commit('AsignarValorLogin', { ValorLogin: 0 }); 
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El usuario NO pudo ser registrado',
                        confirmButtonColor: '#ff0000a8',
                    })
                    alert("El usuario NO pudo ser registrado, El Email ó Usuario ingresado ya existe en la base de datos.")

                });

        },
        initialize() {
            this.desserts = this.infoPostulantreAd
        },



        deleteItem(item) {
            this.idDelete = this.desserts[this.desserts.indexOf(item)].id
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true

        },

        async deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            axios.delete("http://granlogiadecolombia.net:1337/api/tbl-postulantes/" + this.idDelete)
                .then(resp => {
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se logro eliminar',
                        allowOutsideClick: false,
                        backdrop: false,
                        confirmButtonColor: '#ff0000a8'
                    });
                });
            this.closeDelete()

        },
        async editItem(item) {
            console.log("Cedula masonicaaaaaaa", this.DatosClasificacionTipo)
            var idtemp = this.DatosClasificacionTipo.filter(tipoid => tipoid.IdClasificacion == 4);
            var dataclass = JSON.parse(JSON.stringify(idtemp));
            var resultados = dataclass[0].text.split('-')
            resultados[1] = Math.floor(resultados[1])
            resultados[1] = resultados[1] + 1
            resultados[1] = resultados[1].toString()
            switch (resultados[1].length) {
                case 1:
                    resultados[1] = "0000" + (resultados[1]).slice(0, 1);
                    break;
                case 2:
                    resultados[1] = "000" + (resultados[1]).slice(0, 2);
                    break;
                case 3:
                    resultados[1] = "00" + (resultados[1]).slice(0, 3);
                    break;
                case 4:
                    resultados[1] = "0" + (resultados[1]).slice(0, 4);
                    break;

            }
            console.log("wiiiiiiiiiiiiii", dataclass)
            resultados = resultados[0] + "-" + resultados[1]
            console.log("Cedula aaaaaa", resultados)
            const data = {

                "data": {
                    "IdClasificacion": dataclass[0].IdClasificacion,
                    "Descripcion": resultados,
                    "Tipo": dataclass[0].value
                }
            }

            function sendcedula(data) {
                axios.put("https://granlogiadecolombia.net:1337/api/tbl-tipo-clasificacions/1", data, {
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(resp => {
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'creacion id user cedula masonica',
                            allowOutsideClick: false,
                            backdrop: false,
                            confirmButtonColor: '#ff0000a8'
                        });
                    });

            }
            this.editedIndex = this.desserts.indexOf(item)
            this.dialog = true
            this.idDelete = this.desserts[this.desserts.indexOf(item)].id
            Swal.fire({
                title: '¿Esta seguro que desea enviar el token al postulante?',
                text: "No podra revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Enviar!'
            }).then((result) => {
                if (result.isConfirmed) {

                    function makeid(length) {
                        let result = '';
                        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                        const charactersLength = characters.length;
                        let counter = 0;
                        while (counter < length) {
                            result += characters.charAt(Math.floor(Math.random() * charactersLength));
                            counter += 1;
                        }
                        return result;
                    }
                    sendcedula(data)
                    let codToken = makeid(10)
                    const user = {

                        "username": this.desserts[this.desserts.indexOf(item)].NombreApellido,
                        "email": this.desserts[this.desserts.indexOf(item)].Email,
                        "password": "GLC2023",
                        "Roles": "Postulante",
                        "Token": codToken,
                        "CedulaMasonica": resultados

                    };
                    axios.post("http://granlogiadecolombia.net:1337/api/auth/local/register", user, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(response => {
                            this.RegistroExitoso = 1;
                            this.dialog = true;
                            //store.commit('AsignarValorLogin', { ValorLogin: 1 });
                            /*console.log('entro por el ok');
                          console.log("Registro correcto")
                          alert("Usuario registrado con exito, por favor digite sus credenciales para poder ingresar.") */
                            const serviceID = 'service_3x61aur';
                            const templateID = 'template_bm2hnrm';
                            const IdUser = 'DBiMDy6N8p2zoftdn';

                            emailjs.send(serviceID, templateID, {
                                message: codToken,
                                name: this.desserts[this.desserts.indexOf(item)].NombreApellido,
                                reply_to: "A continuación encontraras en código de verificación para ingreso a nuestra pagina.",
                                email: this.desserts[this.desserts.indexOf(item)].Email,
                            }, IdUser).then(function (response) {
                                console.log('SUCCESS!', response.status, response.text);
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Correcto',
                                    text: 'Enviado correctamente!',
                                    confirmButtonColor: '#ff0000a8',
                                })
                            }, function (error) {
                                console.log('FAILED...', error);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'No se pudo enviar correctamente!',
                                    confirmButtonColor: '#ff0000a8',
                                })
                            });

                        })
                        .catch(error => {
                            console.log("error:", error)
                            this.RegistroExitoso = 0
                            //store.commit('AsignarValorLogin', { ValorLogin: 0 }); 
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'El usuario NO pudo ser registrado',
                                confirmButtonColor: '#ff0000a8',
                            })
                            alert("El usuario NO pudo ser registrado, El Email ó Usuario ingresado ya existe en la base de datos.")

                        });


                    Swal.fire(
                        'Enviado!',
                        'El token ha sido enviado.',
                        'success'
                    )
                    this.idDelete = this.desserts[this.desserts.indexOf(item)].id
                    this.editedIndex = this.desserts.indexOf(item)
                    this.editedItem = Object.assign({}, item)
                }


            })

        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>
    
<style  scoped>
/* lang="scss" */
.imagenGJX {
    width: 4%;
}

.piedepagina {
    color: #1e1e1e !important;
    caret-color: #fff !important;
}

b,
strong {
    font-weight: NORMAL;
    font-size: 10px;
}

.letraText {
    font-family: 'Arial Narrow', sans-serif;
    margin-left: 200px;
    margin-right: 200px;
    font-size: 18px;
    text-align: justify;

}

.v-carousel .v-window-item {
    padding: 12px;
}

.texto-justificado {
    text-align: justify;
}

.mx-auto {
    width: 100%;
    max-width: 800px;
    margin-right: 0px;
    margin-left: 0px;
    margin-bottom: 10px;
}

.mx-auto-img {
    height: 300px;
    width: 650px;
    align-items: center;
}

.theme--dark.v-card {
    background-color: #eee;
}

.v-application .white--text {
    color: #000000 !important;
    caret-color: #00000000 !important;
}

.subheading {
    color: #FFE697
}

.v-application .teal {
    background-color: #142547 !important;
    border-color: #142547 !important;
}

.login {
    padding: 1rem;
}

.title {
    text-align: center;
}

.mx-auto {
    margin-bottom: 130px;
    margin-top: 80px;
}

.form {
    height: 50vh;
    margin: 0rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30vw;
    min-width: 520px;
    max-width: 20%;
    background: #292611;
    border-radius: 5px;
    padding: 30px;
    box-shadow: 0 4px 10px 4px rgba(10, 1, 1, 0.3);
}

@media (min-width: 300px) and (max-width: 700px) {
    .form {
        min-width: 43vh;
        max-width: 36vh;
    }
}

.form-label {
    margin-top: 1rem;
    color: white;
    margin-bottom: 0.5rem;
    /*   &:first-of-type {
        margin-top: 0rem;
      } */
}

.form-input {
    padding: 10px 15px;
    background: #90A4AE;
    background-image: none;
    border: 1px solid white;
    color: white;
    /*   &:focus {
        outline: 0;
        border-color: #1ab188;
      } */
}

.form-submit {
    background: #ffe697;
    border: none;
    color: rgb(12, 2, 2);
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    font-size: 1.3em;
    transition: background 0.2s;
    /*   &:hover {
        background: #0b9185;
      } */
}

.error {
    margin: 1rem 0 0;
    color: #110f10;

}

.msg {
    margin-top: 3rem;
    text-align: center;
}
</style>