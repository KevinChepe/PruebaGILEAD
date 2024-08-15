<template>
  <div>
    <v-container>
      <v-row class="mb-6" no-gutters>
        <v-col sm="5" offset-sm="2" md="6" offset-md="0">
          <v-sheet class="pa-2 ma-2">
            <v-card class="mx-auto" color="#0E264A" v-if="prueba == 'Miembro' || prueba == 'Administrador'">
              <v-img class="white--text align-end" src="../assets/imageChance.jpg"></v-img>
              <v-card-title class="Title">Mi hoja de vida</v-card-title>

              <v-card-subtitle>
                <span class="Title">Ingrese o actualice su hoja de vida </span>
              </v-card-subtitle>

              <v-card-actions>
                <v-btn variant="tonal" color="#FFC82C" @click="IngresarHoja()">Ingresar</v-btn>
                <!--  <v-btn text color="teal accent-4"  @click="reveal = true">Learn More</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-col>
        <v-col sm="5" offset-sm="2" md="6" offset-md="0">
          <v-sheet class="pa-2 ma-2">
            <v-card class="mx-auto" color="#0E264A" v-if="prueba == 'Miembro' || prueba == 'Administrador'">
              <v-img class="white--text align-end" src="../assets/News.jpg"></v-img>
              <v-card-title class="Title">Historial de pagos</v-card-title>

              <v-card-subtitle color="amber">
                <span class="Title">Consulte o realice pagos de suscripción</span>
              </v-card-subtitle>

              <v-card-actions>
                <v-btn variant="tonal" color="#FFC82C">Ingresar</v-btn>
                <!--  <v-btn text color="teal accent-4"  @click="reveal = true">Learn More</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-col>

        <v-col sm="5" offset-sm="2" md="6" offset-md="0">
          <v-sheet class="pa-2 ma-2">
            <v-card class="mx-auto" color="#0E264A" v-if="prueba == 'Postulante'">
              <v-img class="white--text align-end" src="../assets/Reclutadores.jpg"></v-img>
              <v-card-title class="Title">Unirme a la logia</v-card-title>

              <v-card-subtitle>
                <span class="Title">Ingrese su hoja de vida </span>
              </v-card-subtitle>

              <v-card-actions>
                <v-btn variant="tonal" color="#FFC82C" @click="IngresarHoja()">Ingresar</v-btn>
                <!--  <v-btn text color="teal accent-4"  @click="reveal = true">Learn More</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-col>

        <v-col sm="5" md="6">
          <v-sheet class="pa-2 ma-2">
            <v-card class="mx-auto" color="#0E264A" v-if="prueba == 'Administrador'">
              <v-img class="white--text align-end" src="../assets/Reclutador4.jpg"></v-img>
              <v-card-title class="Title">Administrar Usuarios</v-card-title>

              <v-card-subtitle>
                <span class="Title">Aqui podra visualizar y administrar los usuarios </span>
              </v-card-subtitle>

              <v-card-actions>
                <v-btn variant="tonal" color="#FFC82C" @click="IngresarAdmin()">Ingresar</v-btn>
                <!--  <v-btn text color="teal accent-4"  @click="reveal = true">Learn More</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>

    </v-container>

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
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import auth from "@/auth";

export default {
  name: 'HelloWorld',

  data: () => ({

    prueba: localStorage.roles,

  }),
  beforeMount() {
  },
  methods: {
    IngresarAdmin() {
      this.dialog = false;
      this.$router.push("/admin")
    },
    async IngresarHoja() {
      try {
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-politica-datoes?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { 'Content-Type': 'application/json' }
        });
        if ("true" == response.data.data[0].attributes.AutorizacionHabeasData) {
          this.$router.push("/hojavida")
        } else {
          this.$router.push("/PoliticaSeguridad")
        }
      }
      catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
        this.$router.push("/PoliticaSeguridad")
      }

    }

  }
}
</script>

<style scoped>
.imagen {

  max-width: 100%;
  max-height: 100%;
  height: auto;
  width: auto;

}

.imagenGJX {
  width: 4%;
}

.piedepagina {
  color: #1e1e1e !important;
  caret-color: #fff !important;
}

.v-application .teal {
  background-color: #142547 !important;
  border-color: #142547 !important;
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
  color: #FFE697
}

.Title {
  color: rgb(252, 249, 249);
}</style>
  