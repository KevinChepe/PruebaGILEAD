<template>
  <div>
    <div class="mt-4 text-subtitle-2"></div>
    <v-card class="mx-auto my-0" max-width="100%" color="#3e89d370">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
      </template>

      <v-img contain height="200" src="../assets/logo-infecto-clinicos-main.png"></v-img>
      <h1 class="letraTitle" color="red">Bienvenidos</h1>

    </v-card>

    <v-carousel>
      <v-carousel-item>
        <v-sheet :color="'#81818173'" height="95%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2">
              <v-card class="mx-auto">
                <v-img class="mx-auto-img" src="../assets/doctores.jpg" cover></v-img>
                <v-card-title>
                  Ingresar
                </v-card-title>
                <v-card-subtitle>
                  Hacemos parte de la primera línea contra el VIH.
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn class="boton" @click="LlevarRegisterPostulante()">
                    Explorar
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet :color="'#81818173'" height="95%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2">
              <v-card class="mx-auto">
                <v-img class="mx-auto-img" src="../assets/paciente.jpg" cover></v-img>
                <v-card-title>
                  Deseo obtener más información.
                </v-card-title>
                <v-card-actions>
                  <v-btn class="boton" @click="PostularPrimeraVez()">
                    Explorar
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <div>

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
              © {{ new Date().getFullYear() }} — <strong text-align="right"> INFECTOCLIÍNICOS. TODOS LOS DERECHOS RESERVADOS. - POWERED BY GJX </strong><v-img class="imagenGJX"
                src="../assets/gjx.png"></v-img>
            </v-card-text>

          </v-card>
        </v-footer>
      </template>
    </div>
  </div>
</template>

<script>


export default {
  data: () => ({
    colors: [
      'primary',
      'secondary',
      'yellow darken-2',
      'red',
      'orange',
    ],


  }),
  methods: {
    IngresoMiembroPrimeraVez() {
      this.dialog = false;
      this.$router.push("/miembroTok")

    },


    PostularPrimeraVez() {
      this.dialog = false;
      location.href ="https://infectoclinicos.co/";

    },
    LlevarRegisterPostulante() {
      this.dialog = false;
      this.$router.push("/login")

    }


  },
  computed: {

  }


};


</script>


<style  scoped>
.imagenGJX {
  width: 4%;
}
.piedepagina {
    color: #1e1e1e!important;
    caret-color: #fff!important;
}


@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

.letraTitle {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #000000;
}

.theme--light.v-btn.v-btn--has-bg {
  background-color: #3e89d370;
}

.boton {

  font-size: 10px;
  line-height: 50px;
  text-align: center;
  width: 180px;
  margin-left: 12px;
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
  border-color: #000000 !important;
}

@media (min-width: 300px) and (max-width: 700px) {
  .mx-auto {
    width: 100%;
    max-width: 280px;
    margin-right: -50px;
    margin-left: 0px;
    margin-top: -50px;
    margin-bottom: -50px;
  }

  .mx-auto-img {
    height: auto;
    width: auto;


  }
}
</style>
    
  