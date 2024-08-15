<template>
  <div>
    <v-app>

      <v-flex class="mx-auto">
        <!-- :loading="loading" -->
        <v-card class="mx-auto" max-width="574" color="#81818173">
          <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
          </template>

          <v-img contain height="200" src="../assets/logo-infecto-clinicos-main.png"></v-img>


          <v-card-text>
            <v-form action class="form" @submit.prevent="login">
              <label class="form-label" for="#email">Email:</label>
              <input v-model="email" class="form-input" type="email" id="email" required placeholder="Email">
              <label class="form-label" for="#password">Password:</label>
              <input v-model="password" class="form-input" type="password" id="password" placeholder="Password">
              <p v-if="error" class="error"><v-alert type="error">Has introducido mal el email o la contraseña..</v-alert>
              </p>
              <input class="form-submit" type="submit" value="Ingresar">
            </v-form>
          </v-card-text>

        </v-card>
      </v-flex>

    </v-app>

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
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js">
</script>
<script>
import auth from "@/auth";
import store from "../store/index.js";
import { mapActions, mapMutations, mapState } from 'vuex';
import emailjs from 'emailjs-com';
import swal from 'sweetalert2';
window.Swal = swal;

export default {
  data: () => ({
    email: "",
    password: "",
    error: false,
  }),
  methods: {
    ...mapMutations(['AsignarValorLogin']),
    async login() {
      try {
        const res = await auth.login(this.email, this.password);
        const user = {
          email: this.email,
          tipousuario: res.data.user.tipousuario,
          token: res.data.jwt,
          username: res.data.user.username,
          CedulaMasonica : res.data.user.CedulaMasonica,


        };
        auth.setUserLogged(user)
        localStorage.email = user.email;
        localStorage.cedula = res.data.user.CedulaMasonica;
        localStorage.tipousuario = user.tipousuario;
        localStorage.token = res.data.user.Token;
        localStorage.username = user.username;
        localStorage.roles = res.data.user.Roles;


        if (localStorage.token == "null"){

          console.log("user no existe")
        }else{
          console.log("entreeeeeeeeeeeeeeeee",res)
          this.$router.push("/hojavida");
          let codToken="";       
          
        }
        /*         if (this.$route.path != '/regparticipante') {
                this.$router.push("/regparticipante");
                 } */
      } catch (error) {
        this.error = true;
        console.log("error:", error)
        //store.commit('AsignarValorLogin', { ValorLogin: 0 ,user: 'xxx',tipoususrio:''});
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
.imagenGJX {
  width: 4%;
}
.piedepagina {
    color: #1e1e1e!important;
    caret-color: #fff!important;
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
  color: #007ef9
}

.v-application .teal {
  background-color: #81818173 !important;
  border-color: #81818173 !important;
}

.mx-auto {
  margin-top: 20px;
}

.login {
  padding: 1rem;
}

.title {
  text-align: center;
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
  background: #3e89d370;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 0 4px 10px 4px rgba(10, 1, 1, 0.3);
}

@media (min-width: 300px) and (max-width: 700px) {
  .form {
    min-width: 43vh;
    max-width: 36vh;
    background: #3e89d370
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
  background: #007cf9;
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
}</style>