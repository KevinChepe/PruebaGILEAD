<template>
    <v-card class="mx-auto" max-width="500">
        <v-card-text>
            <div>Deseo postularme, ya poseeo un token</div>
            <p class="text-h4 text--primary">
                Bienvenido
            </p>
            <div class="text--primary">
                Por favor ingrese el token recibido despues del pago y su nueva contraseña.<br>
                Esto lo llevará a el formulario en el cual puedes enviar tu solicitud, deberá llenarse la totalidad de los
                datos en el formulario.<br><br>
            </div>
            <v-text-field v-model="correo" filled color="deep-purple" counter="40" label="Ingresa tu correo"
                style="min-height: 96px"></v-text-field>
            <v-text-field v-model="token" filled color="deep-purple" counter="40" label="Token Proporcionado"
                style="min-height: 96px"></v-text-field>
            <v-text-field v-model="password" type="password" filled color="deep-purple" counter="40" label="Contraseña"
                style="min-height: 96px"></v-text-field>
            <v-text-field v-model="confirmPassword" type="password" filled color="deep-purple" counter="40"
                label="Confirme contraseña" style="min-height: 96px"></v-text-field>
            <v-btn color="grey" @click="enviarData()">
                Enviar
            </v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
import auth from "@/auth";
import emailjs from 'emailjs-com';
import axios from "axios";
import DatePicker from "../components/DatePicker";
import { mapActions, mapState, mapMutations } from 'vuex';
import store from "../store/index.js";
import Departamentos from "../Data/Departamentos.js";
import Estudios from "../Data/Estudios.js"
import Mcipios from "../Data/Municipios.js";
import EstadoEstudio from "../Data/EstadoEstudio.js";
import swal from 'sweetalert2';
window.Swal = swal;

export default {
    data: () => ({
        correo: "",
        token: "",
        password: "",
        confirmPassword: "",
        error: false
    }),
    methods: {
        ...mapMutations(['AsignarValorLogin']),
        async enviarData() {
            if (this.razonExplicacion != "" & this.nombre != "" & this.correo != "") {
                if (this.password == this.confirmPassword) {
                    try {
                        const Key = 'Bearer ' + auth.getUserLogged().token;
                        var response = await axios.get('http://granlogiadecolombia.net:1337/api/users?filters[email][$eq]=' + this.correo, {
                            headers: { 'Content-Type': 'application/json' }
                        });
                    }
                    catch (error) {
                        console.log("Error, no trajo informacion del api para listar ofertas ", error);
                    }

                    if (this.token == response.data[0].TokenConfirmacion & response.data[0].Roles == "Postulante") {
                        const user = {
                            "id": response.data[0].id,
                            "username": response.data[0].username,
                            "email": response.data[0].email,
                            "password": this.password,
                            "confirmed": response.data[0].confirmed,
                            "TokenConfirmacion": "",
                            "Roles": response.data[0].Roles
                        }
                        store.commit('AsignacionInformacionPostulanteToken', user);
                        store.dispatch('PostInfoPostulanteToken');
                        localStorage.roles =response.data[0].Roles
                        this.$router.push("/homeInfo")
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Token incorrecto o tipo de usuario',
                            allowOutsideClick: false,
                            backdrop: false,
                            confirmButtonColor: '#ff0000a8'
                        });
                    }

                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Informacion no pudo ser registrada, llene todos los campos',
                    allowOutsideClick: false,
                    backdrop: false,
                    confirmButtonColor: '#ff0000a8'
                });
            }
        }

    },
    computed: {
        ...mapState(['VarLogin', 'TipoIngreso']),

        userLogged() {
            return auth.getUserLogged();
        },

    }
};


</script>
    
<style  scoped>
/* lang="scss" */
.login {
    padding: 1rem;
}

.title {
    text-align: center;
}

.mx-auto {
    margin-top: 50px;
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