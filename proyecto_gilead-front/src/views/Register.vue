<template>

  <div class="register">



    <!-- <b-alert variant="success" show><h1 class="title">Registrese</h1></b-alert> -->
    <form action class="form" @submit.prevent="register"> 
 
      <p class="title">Registro</p>     
  
      <label class="form-label" for="#username">Usuario:</label>
      <input
        v-model="username"
        class="form-input"
        type="text"
        id="username"
        required
        placeholder="UserName"
      >
             
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      >
      <label class="form-label" for="#password">Contraseña:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      >
<!--        <label class="form-label" for="#codigo-habilitacion">Codigo Entidad:</label>
      <input
        v-model="CodigoHabilitacion"
        class="form-input"
        type="text"
        id="codigo-habilitacion"
        required
        placeholder="CodigoHabilitacion"
      >  -->
      <input class="form-submit" type="submit" value="Registrar">
    </form>


      <div class="text-center" v-if="RegistroExitoso == 1 ">
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <v-card v-if="RegistroExitoso == 1 ">
              <v-card-title class="text-h5 grey lighten-2">
                Registro Exitoso
              </v-card-title>

              <v-card-text>
                Su regitro se realizo correctamente, por favor ingrese con el email y contraseña que proporciono en el registro en la opción de menu "INGRESAR" 
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="LlevarHome()"
                >
                  Aceptar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
  </div>
  
</template>



<script>
import auth from "@/auth";
//import Habilitacion from "../Data/CodigoEntidad.js";
import axios from "axios";
import store from "../store/index.js";
import {mapMutations, mapState} from 'vuex';

export default {
  data: () => ({
    email: "",
    password: "",
    CodigoHabilitacion: "",
    username:"",
    error: false,
    confirmed:false,
    //CodHabilitacion:Habilitacion,
    CodHabilitacion:null,
    errors: [],
    EstaelCodigo: null,
    ExisteCodigo: null,
    RegistroExitoso: 0,
    dialog: false,
  }),
  methods: {

    async register() 
    {
            const username = this.username
            const email = this.email
            const password = this.password
            const confirmed = this.confirmed
            const tipousuario = store.state.TipoIngreso
            //const CodigoHabilitacion = this.CodigoHabilitacion
        
            const user = {username,email, password,confirmed};
            axios.post("http://granlogiadecolombia.net:1337/api/auth/local/register", user)
            .then(response => {
              this.RegistroExitoso = 1;
              this.dialog = true;
              //store.commit('AsignarValorLogin', { ValorLogin: 1 });
                /*console.log('entro por el ok');
              console.log("Registro correcto")
              alert("Usuario registrado con exito, por favor digite sus credenciales para poder ingresar.") */
              
            })
            .catch(error => {
              console.log("error:",error)
              this.RegistroExitoso = 0
              //store.commit('AsignarValorLogin', { ValorLogin: 0 }); 
              alert("El usuario NO pudo ser registrado, El Email ó Usuario ingresado ya existe en la base de datos.")
              
            }); 
    },


    LlevarHome(){
      this.dialog = false;
      this.$router.push("/")

    }
  },

  
  computed:{
    ...mapState(['VarLogin','TipoIngreso']),

  },  
};
</script>


<style  scoped>

.register {
  padding: 2rem;
}
.title {
  text-align: center;
  color: white;
  font-size:small;

}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
/*   &:first-of-type {
    margin-top: 0rem;
  } */
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
/*   &:focus {
    outline: 0;
    border-color: #1ab188;
  } */
}
.form-submit {
  background: #f13210f5;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
/*   &:hover {
    background: #0b9185;
  } */
}
.error {
  margin: 1rem 0 0;
  color: #88083b;
}
</style>