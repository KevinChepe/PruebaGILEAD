<template>
  <div>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step color="#007ef9" :complete="e6 > 1" step="1">
        Paso 1
        <small>Información Sociodemográfica</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card class="mb-12 mx-auto mx-auto" color="grey lighten-4" height="1100px">
          <v-container>
            <v-form ref="form">

              <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ Precarga de Información  ----------------------------------------------
                      ------------------------------------------------------------------------------------------------------>

              <v-layout class="justify-center">
                <v-form fast-fail @submit.prevent>
                  <v-flex xs20>
                    <v-select prepend-inner-icon="mdi-web" v-model="VtipoDocumeto" :counter="31" :items=TipoDocumento
                      label="Tipo de documento" filled dense required>
                    </v-select>
                  </v-flex>
                  <v-flex xs20>
                    <v-text-field prepend-inner-icon="mdi-account" :counter="20" :rules="nroIdRules"
                      v-model="Videntificacion" label="Número de identificación" filled dense required>
                    </v-text-field>
                  </v-flex>

                  <v-btn color="primary" v-on:click="buscarPaciente()">
                    Buscar Paciente
                  </v-btn>

                </v-form>

              </v-layout>
              <br>

              <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ NOMBRES ----------------------------------------------
                      ------------------------------------------------------------------------------------------------------>
              <v-layout class="justify-center">
                <v-flex xs4>
                  <v-text-field prepend-inner-icon="mdi-account" :counter="20" :rules="nameRules"
                    v-model="VprimerNombre" label="Primer Nombre" filled dense required>
                  </v-text-field>
                </v-flex>

                <span style="color:white">-</span>

                <v-flex xs4>
                  <v-text-field prepend-inner-icon="mdi-account" :counter="20" :rules="nameRules"
                    v-model="VsegundoNombre" label="Segundo Nombre" filled dense required>
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout class="justify-center">
                <v-flex xs4>
                  <v-text-field prepend-inner-icon="mdi-account" :counter="20" :rules="nameRules"
                    v-model="VprimerApellido" label="Primer Apellido" filled dense required>
                  </v-text-field>
                </v-flex>

                <span style="color:white">-</span>

                <v-flex xs4>
                  <v-text-field prepend-inner-icon="mdi-account" :counter="20" :rules="nameRules"
                    v-model="VsegundoApellido" label="Segundo Apellido" filled dense required>
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout class="justify-center">
                <v-flex xs4>
                  <v-select prepend-inner-icon="mdi-web" v-model="Vpais" :counter="31" :items=Paises
                    label="Pais de origen" filled dense required>
                  </v-select>
                </v-flex>

                <span style="color:white">-</span>

                <v-flex xs4>
                  <v-text-field prepend-inner-icon="mdi-email" :counter="50" :rules="emailRules" v-model="Vemail"
                    label="Email" filled dense required>
                  </v-text-field>
                </v-flex>
              </v-layout>


              <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ Informacion de contacto  ----------------------------------------------
                      ------------------------------------------------------------------------------------------------------>
              <v-layout class="justify-center">
                <v-flex xs2>
                  <v-select prepend-inner-icon="mdi-cellphone-android" v-model="VtelefonoPrefijos" :counter="30"
                    :items=TelefonoPrefijos label="Prefijo" filled dense required>
                  </v-select>
                </v-flex>
                <span style="color:white">-</span>
                <v-flex xs4>
                  <v-text-field :counter="20" :rules="nroPhoneRules" v-model="VphoneWhatsapp" label="Celular - WhatsApp"
                    filled dense required>
                  </v-text-field>
                </v-flex>
              </v-layout>


              <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ GENERO -----------------------------------------------
                      ------------------------------------------------------------------------------------------------------>
              <v-layout class="justify-center">
                <v-flex xs4>
                  <v-select prepend-inner-icon="mdi-human"
                    :items="[{ value: 'Masculino', text: 'Masculino' }, { value: 'Femenino', text: 'Femenino' }]"
                    v-model="Vsexo" :rules="selectRules" label="Sexo" filled dense required></v-select>
                </v-flex>

                <span style="color:white">-</span>

                <v-flex xs4>
                  <v-text-field prepend-inner-icon="mdi-cake-variant" v-model="Vedad" :counter="2" :rules="nroEdadRules"
                    label="Edad" filled dense required>
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout class="justify-center">
                <v-flex xs4>
                  <v-select prepend-inner-icon="mdi-account-group"
                    :items="[{ value: 'No binario', text: 'No binario' }, { value: 'Bisexual', text: 'Bisexual' }, { value: 'Transgenero', text: 'Transgénero' }, { value: 'Lesbiana', text: 'Lesbiana' }, { value: 'Gay', text: 'Gay' }, { value: 'Intersexual', text: 'Intersexual' }, { value: 'Otro', text: 'Otro' }]"
                    v-model="Vgenero" :rules="selectRules" label="Género" filled dense required></v-select>
                </v-flex>

                <span style="color:white">-</span>

                <v-flex xs4>
                  <v-select prepend-inner-icon="mdi-account-settings"
                    :items="[{ value: 'Soltero', text: 'Soltero(a)' }, { value: 'Unión Libre', text: 'Unión Libre' }, { value: 'Casado', text: 'Casado(a)' }, { value: 'Viudo', text: 'Viudo(a)' }, { value: 'Divorciado', text: 'Divorciado(a)' }]"
                    v-model="VestadoCivil" :rules="selectRules" label="Estado civil" filled dense required></v-select>
                </v-flex>
              </v-layout>

              <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ EDUCACIÓN --------------------------------------------
                      ------------------------------------------------------------------------------------------------------>


              <v-layout class="justify-center">
                <v-flex xs4>
                  <v-select prepend-inner-icon="mdi-school"
                    :items="[{ value: 'Preescolar', text: 'Preescolar' }, { value: 'Basica primaria ', text: 'Básica primaria ' }, { value: 'Basica secundaria ', text: 'Básica secundaria ' }, { value: 'Media', text: 'Media' }, { value: 'Universitario', text: 'Universitario' }, { value: 'Especializacion', text: 'Especialización' }, { value: 'Maestria', text: 'Maestría' }, { value: 'Doctorado', text: 'Doctorado' }]"
                    v-model="VnivelEducativo" :rules="selectRules" label="Nivel educativo" filled dense
                    required></v-select>
                </v-flex>

                <span style="color:white">-</span>

                <v-flex xs4>
                  <v-select prepend-inner-icon="mdi-wrench"
                    :items="[{ value: 'Profesionales', text: 'Profesionales: Ingenieros, médicos, abogados, etc' }, { value: 'Tecnicos y Operarios', text: 'Técnicos y Operarios: Electricistas, mecánicos, carpinteros, etc' }, { value: 'Administrativos y Secretariales:', text: 'Administrativos y Secretariales: Secretarias, recepcionistas, auxiliares administrativos, etc.' }, { value: 'Comerciales y Vendedores', text: 'Comerciales y Vendedores: Vendedores, representantes de ventas, agentes comerciales, etc.' }, { value: 'Servicios', text: 'Servicios: Personal de limpieza, seguridad, camareros, cocineros, etc.' }, { value: 'Agricultura, Ganadería y Pesca', text: 'Agricultura, Ganadería y Pesca: Agricultores, ganaderos, pescadores, etc' }, { value: 'Minería y Construcción', text: 'Minería y Construcción: Mineros, albañiles, carpinteros, etc', }, { value: 'Artes y Oficios', text: 'Artes y Oficios: Artistas, artesanos, músicos, etc' }, , { value: 'Ocupaciones no clasificadas', text: 'Ocupaciones no clasificadas: Cualquier otra ocupación que no se ajuste a las categorías anterior.' }]"
                    v-model="Vocupacion" :rules="selectRules" label="Ocupación" filled dense required></v-select>
                </v-flex>
              </v-layout>
              <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ RELIGIÓN ---------------------------------------------
                      ------------------------------------------------------------------------------------------------------>

              <v-layout class="justify-center">
                <v-flex xs4>
                  <v-select prepend-inner-icon="mdi-church"
                    :items="[{ value: 'Catolicismo', text: 'Catolicismo' }, { value: 'Cristianismo', text: 'Cristianismo' }, { value: 'Protestantismo', text: 'Protestantismo' }, { value: 'Otras religiones', text: 'Otras religiones' }, { value: 'Sin religion', text: 'Sin religión' }]"
                    v-model="Vreligion" :rules="selectRules" label="Religión" filled dense></v-select>
                </v-flex>

                <span style="color:white">-</span>

                <v-flex xs4>
                  <v-select prepend-inner-icon="mdi-city"
                    :items="[{ value: 'Estrato 1', text: 'Estrato 1' }, { value: 'Estrato 2', text: 'Estrato 2' }, { value: 'Estrato 3', text: 'Estrato 3' }, { value: 'Estrato 4', text: 'Estrato 4' }, { value: 'Estrato 5', text: 'Estrato 5' }, { value: 'Estrato 6', text: 'Estrato 6' }]"
                    v-model="Vestrato" :rules="selectRules" label="Estrato socioeconómico" filled dense></v-select>
                </v-flex>
              </v-layout>
              <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ OCUPACIÓN --------------------------------------------
                      ------------------------------------------------------------------------------------------------------>

              <v-layout class="justify-center">
                <v-flex xs4>
                  <v-select prepend-inner-icon="mdi-account-edit"
                    :items="[{ value: 'Estudiante', text: 'Estudiante' }, { value: 'Estudiante y empleado', text: 'Estudiante y empleado' }, { value: 'Empleado', text: 'Empleado' }, { value: 'Independiente', text: 'Independiente' }, { value: 'Desempleado', text: 'Desempleado' }]"
                    v-model="Vocupacion_actual" :rules="selectRules" label="Ocupación actual" filled dense></v-select>
                </v-flex>

                <span style="color:white">-</span>

                <v-flex xs4>
                  <v-select prepend-inner-icon="mdi-earth"
                    :items="[{ value: 'Indigena', text: 'Indigena' }, { value: 'Afrodescendiente', text: 'Afrodescendiente' }, { value: 'Raizal', text: 'Raizal' }, { value: 'Palenquero', text: 'Palenquero' }, { value: 'Mestizo', text: 'Mestizo' }, { value: 'Poblacion blanca', text: 'Población blanca' }, { value: 'Otro', text: 'Otro' }]"
                    v-model="VrazaEtnia" :rules="selectRules" label="Raza-etnia" filled dense></v-select>
                </v-flex>
              </v-layout>
              <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ TRATAMIENTO ------------------------------------------
                      ------------------------------------------------------------------------------------------------------>
              <v-layout class="justify-center">
                <v-flex xs4>
                  <v-select prepend-inner-icon="mdi-hospital"
                    :items="[{ value: 'Menos de un mes', text: 'Menos de un mes' }, { value: 'Entre un año y dos años', text: 'Entre un año y dos años' }, { value: 'Entre 3 años y 5 años', text: 'Entre 3 años y 5 años' }, { value: 'Más de 5 años', text: 'Más de 5 años' }]"
                    v-model="VtiempoDiagnostico" :rules="selectRules" label="Tiempo desde el diagnóstico" filled
                    dense></v-select>
                </v-flex>

                <span style="color:white">-</span>

                <v-flex xs4>
                  <v-select prepend-inner-icon="mdi-medical-bag"
                    :items="[{ value: 'Si', text: 'Sí' }, { value: 'No', text: 'No' }]"
                    v-model="VtratamientoAntirretroviral" :rules="selectRules"
                    label="Recibe tratamiento antirretroviral" filled dense></v-select>
                </v-flex>
              </v-layout>
              <div class="text-center">
                <v-btn color="black" class="ma-2 white--text" v-on:click="enviarInfoSociodemografica()">Guardar</v-btn>
                <v-btn color="black" class="ma-2 white--text" @click="Limpiar()">Limpiar</v-btn>
              </div>
            </v-form>
          </v-container>
        </v-card>
        <v-btn color="primary" :disabled="valid" @click="e6 = 2, valid = true">
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-step color="#007ef9" :complete="e6 > 2" step="2">
        Paso 2
        <small>Información Habeas data</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <div>
          <template>
            <v-toolbar-title>Información Habeas data</v-toolbar-title>
            <v-card class="mb-12 mx-auto mx-auto" color="grey lighten-4" height="200px">
              <br>
              <br>
              <br>


              <v-layout class="justify-center">
                <v-flex xs5>
                  <v-btn color="primary" v-on:click="enviarinfoHabeasData()">
                    Enviar el documento para firmar
                  </v-btn>
                </v-flex>

                <span style="color:white">-</span>

                <v-flex xs4>
                  <v-btn color="primary" v-on:click="editarinfoHabeasData()">
                    Verificar firma
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card>
            <v-btn color="black" class="ma-2 white--text" v-on:click="editarinfoHabeasData()">guardar</v-btn>
          </template>
        </div>
        <v-btn color="primary" :disabled="valid" @click="e6 = 3, valid = true">
          Continue
        </v-btn>

        <!-- <v-btn color="primary" to="homeInfo" :disabled="valid" @click="e6 = 9, valid = true">
          Finalizar
        </v-btn> -->
        <v-btn @click="e6 = 1" text>
          atras
        </v-btn>
      </v-stepper-content>

      <v-stepper-step color="#007ef9" :complete="e6 > 3" step="3">
        Paso 3
        <small>Información Salud</small>
      </v-stepper-step>

      <v-stepper-content step="3">

        <div>
          <template>
            <v-card class="mb-12 mx-auto mx-auto" color="grey lighten-4" height="4500px">
              <v-container>
                <v-form ref="form">

                  <span style="color:black">DIMENSIÓN TRANSICIÓN DE SALUD</span>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      1. ¿En el último año, su salud en general ha cambiado en comparación con el año anterior?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '1 = Ha empeorado mucho', text: 'Ha empeorado mucho' }, { value: '2 = Ha empeorado un poco', text: 'Ha empeorado un poco' }, { value: '3 = Ha permanecido igual', text: 'Ha permanecido igual' }, { value: '4 = Ha mejorado un poco', text: 'Ha mejorado un poco' }, { value: '5 = Ha mejorado mucho', text: 'Ha mejorado mucho' }]"
                        v-model="VCambio_salud_anio" :rules="selectRules" label="Cambio en la salud en el último año"
                        filled dense required></v-select>
                    </v-flex>
                  </v-layout>

                  <span style="color:black">DIMENSIÓN: DOLOR</span>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      1. ¿Cuánto dolor ha sentido en las últimas 4 semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No he sentido nada de dolor', text: 'No he sentido nada de dolor' }, { value: '1 = He sentido un poco de dolor', text: 'He sentido un poco de dolor' }, { value: '2 = He sentido bastante dolor', text: 'He sentido bastante dolor' }, { value: '3 = He sentido mucho dolor', text: 'He sentido mucho dolor' }, { value: '4 = He sentido muchísimo dolor', text: 'He sentido muchísimo dolor' }]"
                        v-model="VIntensidad_dolor_actividades" :rules="selectRules" label="Intensidad del dolor" filled
                        dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      2. ¿En qué medida el dolor le ha interferido con sus actividades habituales en las últimas 4
                      semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha causado ninguna molestia', text: 'No me ha causado ninguna molestia' }, { value: '1 = Me ha causado un poco de molestia', text: 'Me ha causado un poco de molestia' }, { value: '2 = Me ha causado bastante molestia', text: 'Me ha causado bastante molestia' }, { value: '3 = Me ha causado mucha molestia', text: 'Me ha causado mucha molestia' }, { value: '4 = Me ha causado muchísima molestia', text: 'Me ha causado muchísima molestia' }]"
                        v-model="VInterferencia_dolor_actividades" :rules="selectRules"
                        label="Interferencia del dolor en las actividades" filled dense required></v-select>
                    </v-flex>
                  </v-layout>


                  <span style="color:black">DIMENSIÓN FUNCIÓN FISICA</span>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      1. ¿Ha tenido que reducir o limitar la cantidad de actividad física que realiza a causa de su
                      salud?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No', text: 'No' }, { value: '1 = Sí, un poco', text: 'Sí, un poco' }, { value: '2 = Sí, bastante', text: 'Sí, bastante' }, { value: '3 = Sí, mucho', text: 'Sí, mucho' }, { value: '4 = Sí, muchísimo', text: 'Sí, muchísimo' }]"
                        v-model="VLimitacion_actividad_fisica" :rules="selectRules"
                        label="Limitación en la actividad física" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      2. ¿Ha tenido que reducir o limitar la cantidad de trabajo o tareas domésticas que realiza a causa
                      de su salud?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No', text: 'No' }, { value: '1 = Sí, un poco', text: 'Sí, un poco' }, { value: '2 = Sí, bastante', text: 'Sí, bastante' }, { value: '3 = Sí, mucho', text: 'Sí, mucho' }, { value: '4 = Sí, muchísimo', text: 'Sí, muchísimo' }]"
                        v-model="VLimitacion_trabajo_domesticas" :rules="selectRules"
                        label="Limitación en el trabajo o tareas domésticas" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      3. ¿Le ha dificultado caminar o subir escaleras a causa de su salud?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No', text: 'No' }, { value: '1 = Sí, un poco', text: 'Sí, un poco' }, { value: '2 = Sí, bastante', text: 'Sí, bastante' }, { value: '3 = Sí, mucho', text: 'Sí, mucho' }, { value: '4 = Sí, no puedo hacerlo', text: 'Sí, no puedo hacerlo' }]"
                        v-model="VDificultad_caminar_escaleras" :rules="selectRules"
                        label="Dificultad para caminar o subir escaleras" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      4. ¿Le ha dificultado agacharse, arrodillarse o recoger objetos del suelo a causa de su salud?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No', text: 'No' }, { value: '1 = Sí, un poco', text: 'Sí, un poco' }, { value: '2 = Sí, bastante', text: 'Sí, bastante' }, { value: '3 = Sí, mucho', text: 'Sí, mucho' }, { value: '4 = Sí, no puedo hacerlo', text: 'Sí, no puedo hacerlo' }]"
                        v-model="VDificultad_agacharse_recoger_objetos" :rules="selectRules"
                        label="Dificultad para agacharse o recoger objetos" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      5. ¿Le ha dificultado vestirse o desvestirse a causa de su salud?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No', text: 'No' }, { value: '1 = Sí, un poco', text: 'Sí, un poco' }, { value: '2 = Sí, bastante', text: 'Sí, bastante' }, { value: '3 = Sí, mucho', text: 'Sí, mucho' }, { value: '4 = Sí, no puedo hacerlo', text: 'Sí, no puedo hacerlo' }]"
                        v-model="VDificultad_vestirse" :rules="selectRules" label="Dificultad para vestirse" filled
                        dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      6. ¿Le ha dificultado comer a causa de su salud?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No', text: 'No' }, { value: '1 = Sí, un poco', text: 'Sí, un poco' }, { value: '2 = Sí, bastante', text: 'Sí, bastante' }, { value: '3 = Sí, mucho', text: 'Sí, mucho' }, { value: '4 = Sí, no puedo hacerlo', text: 'Sí, no puedo hacerlo' }]"
                        v-model="VDificultad_comer" :rules="selectRules" label="Dificultad para comer" filled dense
                        required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      7. ¿Ha tenido que depender de la ayuda de otras personas para realizar sus actividades diarias a
                      causa de su salud?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No', text: 'No' }, { value: '1 = Sí, un poco', text: 'Sí, un poco' }, { value: '2 = Sí, bastante', text: 'Sí, bastante' }, { value: '3 = Sí, mucho', text: 'Sí, mucho' }, { value: '4 = Sí, todo el tiempo', text: 'Sí, todo el tiempo' }]"
                        v-model="VDependencia_ayuda_diarias" :rules="selectRules"
                        label="Dependencia de ayuda para actividades diarias" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      8. ¿Cuánto dolor ha sentido en los últimos 30 días?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No he sentido nada de dolor', text: 'No he sentido nada de dolor' }, { value: '1 = He sentido un poco de dolor', text: 'He sentido un poco de dolor' }, { value: '2 = He sentido bastante dolor', text: 'He sentido bastante dolor' }, { value: '3 = He sentido mucho dolor', text: 'He sentido mucho dolor' }, { value: '4 = He sentido muchísimo dolor', text: 'He sentido muchísimo dolor' }]"
                        v-model="VIntensidad_dolor" :rules="selectRules" label="Intensidad del dolor" filled dense
                        required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      9. ¿En qué medida el dolor le ha dificultado realizar sus actividades habituales en los últimos 30
                      días?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha causado ninguna molestia', text: 'No me ha causado ninguna molestiar' }, { value: '1 = Me ha causado un poco de molestia', text: 'Me ha causado un poco de molestia' }, { value: '2 = Me ha causado bastante molestia', text: 'Me ha causado bastante molestia' }, { value: '3 = Me ha causado mucha molestia', text: 'Me ha causado mucha molestia' }, { value: '4 = Me ha causado muchísima molestia', text: 'Me ha causado muchísima molestia' }]"
                        v-model="VImpacto_dolor_actividades_habituales" :rules="selectRules"
                        label="Impacto del dolor en las actividades habituales" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      10. ¿En qué medida su estado de salud actual le ha limitado para realizar sus actividades
                      habituales?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha limitado en absoluto', text: 'No me ha limitado en absoluto' }, { value: '1 = Me ha limitado un poco', text: 'Me ha limitado un poco' }, { value: '2 = Me ha limitado bastante', text: 'Me ha limitado bastante' }, { value: '3 = Me ha limitado mucho', text: 'Me ha limitado mucho' }, { value: '4 = Me ha limitado muchísimo', text: 'Me ha limitado muchísimo' }]"
                        v-model="VLimitacion_estado_salud" :rules="selectRules"
                        label="Limitación por el estado de salud" filled dense required></v-select>
                    </v-flex>
                  </v-layout>

                  <span style="color:black">DIMENSIÓN SALUD GENERAL</span>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      1. ¿En qué medida su estado de salud en los últimos 12 meses le ha limitado para realizar sus
                      actividades habituales?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha limitado en absoluto', text: 'No me ha limitado en absoluto' }, { value: '1 = Me ha limitado un poco', text: 'Me ha limitado un poco' }, { value: '2 = Me ha limitado bastante', text: 'Me ha limitado bastante' }, { value: '3 = Me ha limitado mucho', text: 'Me ha limitado mucho' }, { value: '4 = Me ha limitado muchísimo', text: 'Me ha limitado muchísimo' }]"
                        v-model="VLimitacion_estado_salud_ultimo_12_mes" :rules="selectRules"
                        label="Estado de salud en los últimos 12 meses" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      2. ¿En qué medida su estado de salud actual le ha limitado para realizar sus actividades
                      habituales en el último mes?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha limitado en absoluto', text: 'No me ha limitado en absoluto' }, { value: '1 = Me ha limitado un poco', text: 'Me ha limitado un poco' }, { value: '2 = Me ha limitado bastante', text: 'Me ha limitado bastante' }, { value: '3 = Me ha limitado mucho', text: 'Me ha limitado mucho' }, { value: '4 = Me ha limitado muchísimo', text: 'Me ha limitado muchísimo' }]"
                        v-model="VEstado_salud_ultimos_meses" :rules="selectRules"
                        label="Limitación por el estado de salud en el último mes" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      3. ¿En qué medida su estado de salud en los últimos 5 años ha sido peor que en años anteriores?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = Mucho peor', text: 'Mucho peor' }, { value: '1 = Un poco peor', text: 'Un poco peor' }, { value: '2 = Igual', text: 'Igual' }, { value: '3 = Un poco mejor', text: 'Un poco mejor' }, { value: '4 = Mucho mejor', text: 'Mucho mejor' }]"
                        v-model="VLimitacion_estado_salud_ultimos_5_anios" :rules="selectRules"
                        label="Limitación por el estado de salud en los últimos 5 años" filled dense
                        required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      4. ¿En general, cómo se siente su salud en este momento?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = Muy mala', text: 'Muy mala' }, { value: '1 = Mala', text: 'Mala' }, { value: '2 = Regular', text: 'Regular' }, { value: '3 = Buena', text: 'Buena' }, { value: '4 = Muy buena', text: 'Muy buena' }]"
                        v-model="VPercepcion_salud_actual" :rules="selectRules" label="Percepción de la salud actual"
                        filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      5. ¿En el último año, su salud en general ha cambiado en comparación con el año anterior?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '1 = Ha empeorado mucho', text: 'Ha empeorado mucho' }, { value: '2 = Ha empeorado un poco', text: 'Ha empeorado un poco' }, { value: '3 = Ha permanecido igual', text: 'Ha permanecido igual' }, { value: '4 = Ha mejorado un poco', text: 'Ha mejorado un poco' }, { value: '5 = Ha mejorado mucho', text: 'Ha mejorado mucho' }]"
                        v-model="VCambio_salud_ultimo_anio" :rules="selectRules"
                        label="Cambio en la salud en el último año" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <span style="color:black">DIMENSIÓN VITALIDAD</span>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      1. ¿Se ha sentido lleno de energía durante las últimas 4 semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '1 = Todo el tiempo', text: 'Todo el tiempo' }, { value: '2 = La mayor parte del tiempo', text: 'La mayor parte del tiempo' }, { value: '3 = Algunas veces', text: 'Algunas veces' }, { value: '4 = Casi nunca', text: 'Casi nunca' }, { value: '5 = Nunca', text: 'Nunca' }]"
                        v-model="VSentimiento_energia" :rules="selectRules" label="Sentimiento de energía" filled dense
                        required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      2. ¿Se ha sentido cansado durante las últimas 4 semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '1 = Todo el tiempo', text: 'Todo el tiempo' }, { value: '2 = La mayor parte del tiempo', text: 'La mayor parte del tiempo' }, { value: '3 = Algunas veces', text: 'Algunas veces' }, { value: '4 = Casi nunca', text: 'Casi nunca' }, { value: '5 = Nunca', text: 'Nunca' }]"
                        v-model="VSentimiento_cansancio" :rules="selectRules" label="Sentimiento de cansancio" filled
                        dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      3. ¿Le ha dificultado realizar sus actividades habituales a causa de la falta de energía durante
                      las últimas 4 semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha causado ninguna molestia', text: 'No me ha causado ninguna molestia' }, { value: '1 = Me ha causado un poco de molestia', text: 'Me ha causado un poco de molestia' }, { value: '2 = Me ha causado bastante molestia', text: 'Me ha causado bastante molestia' }, { value: '3 = Me ha causado mucha molestia', text: 'Me ha causado mucha molestia' }, { value: '4 = Me ha causado muchísima molestia', text: 'Me ha causado muchísima molestia' }]"
                        v-model="VDificultad_actividades_falta_energia" :rules="selectRules"
                        label="Dificultad para realizar actividades por falta de energía" filled dense
                        required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      4. ¿En qué medida el cansancio le ha interferido con sus actividades habituales en las últimas 4
                      semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha causado ninguna molestia', text: 'No me ha causado ninguna molestia' }, { value: '1 = Me ha causado un poco de molestia', text: 'Me ha causado un poco de molestia' }, { value: '2 = Me ha causado bastante molestia', text: 'Me ha causado bastante molestia' }, { value: '3 = Me ha causado mucha molestia', text: 'Me ha causado mucha molestia' }, { value: '4 = Me ha causado muchísima molestia', text: 'Me ha causado muchísima molestia' }]"
                        v-model="VInterferencia_cansancio_actividades" :rules="selectRules"
                        label=" Interferencia del cansancio en las actividades" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <span style="color:black">DIMENSIÓN FUNCIÓN SOCIAL</span>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      1. ¿Le ha dificultado realizar sus actividades sociales a causa de su salud en las últimas 4
                      semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha limitado en absoluto', text: 'No me ha limitado en absoluto' }, { value: '1 = Me ha limitado un poco', text: 'Me ha limitado un poco' }, { value: '2 = Me ha limitado bastante', text: 'Me ha limitado bastante' }, { value: '3 = Me ha limitado mucho', text: 'Me ha limitado mucho' }, { value: '4 = Me ha limitado muchísimo', text: 'Me ha limitado muchísimo' }]"
                        v-model="VLimitacion_realizar_actividades_sociales" :rules="selectRules"
                        label="Limitación para realizar actividades sociales" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      2. ¿Se ha sentido avergonzado o molesto a causa de su estado de salud en las últimas 4 semanas
                      cuando ha estado con otras personas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No he sentido nada de vergüenza o molestia', text: 'No he sentido nada de vergüenza o molestia' }, { value: '1 = He sentido un poco de vergüenza o molestia', text: 'He sentido un poco de vergüenza o molestia' }, { value: '2 = He sentido bastante vergüenza o molestia', text: 'He sentido bastante vergüenza o molestia' }, { value: '3 = He sentido mucha vergüenza o molestia', text: 'He sentido mucha vergüenza o molestia' }, { value: '4 = He sentido muchísima vergüenza o molestia', text: 'He sentido muchísima vergüenza o molestia' }]"
                        v-model="VSentimiento_verguenza_situaciones_sociales" :rules="selectRules"
                        label="Sentimiento de vergüenza o molestia en situaciones sociales" filled dense
                        required></v-select>
                    </v-flex>
                  </v-layout>
                  <span style="color:black">DIMENSIÓN ROL FISICO</span>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      1. ¿Ha tenido que reducir o limitar la cantidad de trabajo o estudios que realiza a causa de su
                      salud?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No', text: 'No' }, { value: '1 = Sí, un poco', text: 'Sí, un poco' }, { value: '2 = Sí, bastante', text: 'Sí, bastante' }, { value: '3 = Sí, mucho', text: 'Sí, mucho' }, { value: '4 = Sí, no puedo trabajar o estudia', text: 'Sí, no puedo trabajar o estudia' }]"
                        v-model="VLimitacion_trabajo_estudios" :rules="selectRules"
                        label="Limitación en el trabajo o estudios" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      2. ¿Le ha dificultado realizar las tareas habituales de su trabajo o estudios a causa de su salud?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No', text: 'No' }, { value: '1 = Sí, un poco', text: 'Sí, un poco' }, { value: '2 = Sí, bastante', text: 'Sí, bastante' }, { value: '3 = Sí, mucho', text: 'Sí, mucho' }, { value: '4 = Sí, no puedo realizarlas', text: 'Sí, no puedo realizarlas' }]"
                        v-model="VDificultad_realizar_tareas" :rules="selectRules"
                        label="Dificultad para realizar tareas" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      3. ¿Le ha dificultado cuidar de su casa a causa de su salud?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No', text: 'No' }, { value: '1 = Sí, un poco', text: 'Sí, un poco' }, { value: '2 = Sí, bastante', text: 'Sí, bastante' }, { value: '3 = Sí, mucho', text: 'Sí, mucho' }, { value: '4 = Sí, no puedo hacerlo', text: 'Sí, no puedo hacerlo' }]"
                        v-model="VDificultad_cuidar_casa" :rules="selectRules" label="Dificultad para cuidar de su casa"
                        filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      4. ¿Le ha dificultado cuidar de otras personas a causa de su salud?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No', text: 'No' }, { value: '1 = Sí, un poco', text: 'Sí, un poco' }, { value: '2 = Sí, bastante', text: 'Sí, bastante' }, { value: '3 = Sí, mucho', text: 'Sí, mucho' }, { value: '4 = Sí, no puedo hacerlo', text: 'Sí, no puedo hacerlo' }]"
                        v-model="VDificultad_cuidar_otras_personas" :rules="selectRules"
                        label="Dificultad para cuidar de otras personas" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <span style="color:black">DIMENSIÓN ROL EMOCIONAL</span>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      1. ¿Le ha dificultado mantener un buen estado de ánimo a causa de su salud en las últimas 4
                      semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha dificultado en absoluto', text: 'No me ha dificultado en absoluto' }, { value: '1 = Me ha dificultado un poco', text: 'Me ha dificultado un poco' }, { value: '2 = Me ha dificultado bastante', text: 'Me ha dificultado bastante' }, { value: '3 = Me ha dificultado mucho', text: 'Me ha dificultado mucho' }, { value: '4 = Me ha dificultado muchísimo', text: 'Me ha dificultado muchísimo' }]"
                        v-model="VDificultad_mantener_estado_animo" :rules="selectRules"
                        label="Dificultad para mantener un buen estado de ánimo" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      2. ¿Se ha sentido nervioso o inquieto a causa de su salud en las últimas 4 semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No he sentido nada de nerviosismo o inquietud', text: 'No he sentido nada de nerviosismo o inquietud' }, { value: '1 = He sentido un poco de nerviosismo o inquietud', text: 'He sentido un poco de nerviosismo o inquietud' }, { value: '2 = He sentido bastante nerviosismo o inquietud', text: 'He sentido bastante nerviosismo o inquietud' }, { value: '3 = He sentido mucho nerviosismo o inquietud', text: 'He sentido mucho nerviosismo o inquietud' }, { value: '4 = He sentido muchísimo nerviosismo o inquietud', text: 'He sentido muchísimo nerviosismo o inquietud' }]"
                        v-model="VSentimiento_nerviosismo_inquietud" :rules="selectRules"
                        label="Sentimiento de nerviosismo o inquietud" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      3. ¿Le ha dificultado realizar sus actividades habituales a causa de sentirse triste o deprimido
                      en las últimas 4 semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha causado ninguna molestia', text: 'No me ha causado ninguna molestia' }, { value: '1 = Me ha causado un poco de molestia', text: 'Me ha causado un poco de molestia' }, { value: '2 = Me ha causado bastante molestia', text: 'Me ha causado bastante molestia' }, { value: '3 = Me ha causado mucha molestia', text: 'Me ha causado mucha molestia' }, { value: '4 = Me ha causado muchísima molestia', text: 'Me ha causado muchísima molestia' }]"
                        v-model="VDificultad_actividades_sentirse_triste_deprimido" :rules="selectRules"
                        label="Dificultad para realizar actividades por sentirse triste o deprimido" filled dense
                        required></v-select>
                    </v-flex>
                  </v-layout>

                  <span style="color:black">DIMENSIÓN SALUD MENTAL</span>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      1. ¿Se ha sentido tranquilo, feliz y relajado durante las últimas 4 semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '1 = Todo el tiempo', text: 'Todo el tiempo' }, { value: '2 = La mayor parte del tiempo', text: 'La mayor parte del tiempo' }, { value: '3 = Algunas veces', text: 'Algunas veces' }, { value: '4 = Casi nunca', text: 'Casi nunca' }, { value: '5 = Nunca', text: 'Nunca' }]"
                        v-model="VSentimiento_bienestar_emocional" :rules="selectRules"
                        label="Sentimiento de bienestar emocional" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      2. ¿Le ha dificultado concentrarse en lo que estaba haciendo a causa de su estado de salud en las
                      últimas 4 semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha dificultado en absoluto', text: 'No me ha dificultado en absoluto' }, { value: '1 = Me ha dificultado un poco', text: 'Me ha dificultado un poco' }, { value: '2 = Me ha dificultado bastante', text: 'Me ha dificultado bastante' }, { value: '3 = Me ha dificultado mucho', text: 'Me ha dificultado mucho' }, { value: '4 = Me ha dificultado muchísimo', text: 'Me ha dificultado muchísimo' }]"
                        v-model="VDificultad_concentrarse_mantener_atencion" :rules="selectRules"
                        label="Dificultad para concentrarse o mantener la atención" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      3. ¿Le ha dificultado tomar decisiones a causa de su estado de salud en las últimas 4 semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha dificultado en absoluto', text: 'No me ha dificultado en absoluto' }, { value: '1 = Me ha dificultado un poco', text: 'Me ha dificultado un poco' }, { value: '2 = Me ha dificultado bastante', text: 'Me ha dificultado bastante' }, { value: '3 = Me ha dificultado mucho', text: 'Me ha dificultado mucho' }, { value: '4 = Me ha dificultado muchísimo', text: 'Me ha dificultado muchísimo' }]"
                        v-model="VDificultad_tomar_decisiones" :rules="selectRules"
                        label="Dificultad para tomar decisiones" filled dense required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout class="justify-center">
                    <v-flex xs8>
                      4. ¿Le ha dificultado dormir a causa de su estado de salud en las últimas 4 semanas?
                      <v-select prepend-inner-icon="mdi-human"
                        :items="[{ value: '0 = No me ha dificultado en absoluto', text: 'No me ha dificultado en absoluto' }, { value: '1 = Me ha dificultado un poco', text: 'Me ha dificultado un poco' }, { value: '2 = Me ha dificultado bastante', text: 'Me ha dificultado bastante' }, { value: '3 = Me ha dificultado mucho', text: 'Me ha dificultado mucho' }, { value: '4 = Me ha dificultado muchísimo', text: 'Me ha dificultado muchísimo' }]"
                        v-model="VDificultad_dormir" :rules="selectRules" label=" Dificultad para dormir" filled dense
                        required></v-select>
                    </v-flex>
                  </v-layout>
                  <div class="text-center">
                    <v-btn color="black" class="ma-2 white--text" v-on:click="enviarInfoCuestionario()">guardar</v-btn>
                    <v-btn color="black" class="ma-2 white--text" @click="Limpiar()">Limpiar</v-btn>
                  </div>
                </v-form>
              </v-container>
            </v-card>

          </template>
        </div>
        <div>
          <v-btn color="primary" to="/" :disabled="valid" @click="e6 = 3, valid = true">
            Finalizar
          </v-btn>
          <v-btn @click="e6 = 2" text>
            atras
          </v-btn>
        </div>
      </v-stepper-content>
    </v-stepper>
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
              © {{ new Date().getFullYear() }} — <strong text-align="right"> INFECTOCLÍNICOS EN BOGOTÁ.
                TODOS LOS DERECHOS RESERVADOS. - POWERED BY GJX </strong><v-img class="imagenGJX"
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
<script>
import axios from "axios";
import DatePicker from "../components/DatePicker";
import {mapActions, mapState, mapMutations} from 'vuex';
import store from "../store/index.js";
import Departamentos from "../Data/Departamentos.js";
import Estudios from "../Data/Estudios.js"
import Mcipios from "../Data/Municipios.js";
import EstadoEstudio from "../Data/EstadoEstudio.js";
import swal from 'sweetalert2';
window.Swal = swal;


export default {
  name: 'Formacion',
  components: {
        DatePicker
    },
    
  data: () => ({
    prueba: localStorage.roles,
    formTitle:'',
    aux:0,
    tab: 'option-1',
    idgeneralCorreo:'',
    VNombres:'',
    VApellidos:'',
    VFecha:'',
    VTipoId:'',
    TipoId:'',
    VNroIdRules:'',
    NroIdRules:'',
    VGenero:'',
    VEstadoCivil:'',


    VNombreApellidoPadre:'',
    VNombreApellidoMadre:'',
    VNombreApellidoPareja:'',
    VVivePadre:'',
    VViveMadre:'',
    VVivePareja:'',
    VOpinionParejaMasoneria:'',
    VPorqueOpinionPareja:'',
    VTieneHijos:'',
    VNumeroHijos:'',
    VConviveHijos:'',

    VTallerLogia:'',
    VGradoLogia:'',


    VPersonasAcargo:'',
    VIngresoMensual:'',
    VRentas:'',
    VOtrosIngresos:'',
    VTotalIngresos:'',
    VPatrimonio:'',
    VPatrimonioRepresentado:'',
    VCasaAlquilada:'',
    VValorArrendamiento:'',
    VEgresosMensuales:'',


    VTipoSangre:'',
    VRh:'',
    VSeguroVida:'',
    VSeguroMedico:'',
    VCualSeguro:'',
    VEps:'',
    VEstadoSalud:'',


    VParienteMason:'',
    VNombreParienteMason:'',
    VLogiaPariente:'',
    VCiudadLogiaPariente:'',
    VSugeridoMasoneria:'',
    VQuienSugerido:'',
    VFormuladoSolicitud:'',
    VSolicitudDonde:'',
    VSolicitudCuando:'',
    VSolicitudLogia:'',
    VVinculoPresentaMason:'',
    VEntiendeMasoneria:'',
    VOportunidadPertenecer:'',
    VProyectVidaMasoneria:'',
    VEntiendeSociedadSecreta:'',
    VPerteneceSociedadSecreta:'',
    VCualPerteneceSociedad:'',
    VRazonVida:'',
    VAporteMejorarHumanidad:'',
    VPrincipioCreador:'',
    VPorquePrincipioCreador:'',


    TipoDocumento: [
      { value: 'CC', text: 'Cedula de ciudadania' },
      { value: 'CE', text: 'Cedula de extranjeria' },
      { value: 'PPT', text: 'Permiso por protección temporal' },
      { value: 'PEP', text: 'Permiso especial de permanencia' },
    ],

    TelefonoPrefijos: [
      { value: '+1', text: '+1 Estados Unidos / Canadá' },
      { value: '+44', text: '+44 Reino Unido' },
      { value: '+52', text: '+52 México' },
      { value: '+57', text: '+57 Colombia' },
      { value: '+34', text: '+34 España' },
      { value: '+33', text: '+33 Francia' },
      { value: '+49', text: '+49 Alemania' },
      { value: '+55', text: '+55 Brasil' },
      { value: '+39', text: '+39 Italia' },
      { value: '+91', text: '+91 India' },
      { value: '+81', text: '+81 Japón' },
      { value: '+61', text: '+61 Australia' },
      { value: '+86', text: '+86 China' },
      { value: '+7', text: '+7 Rusia' },
      { value: '+82', text: '+82 Corea del Sur' }
    ],

    Paises: [
      { value: '129', text: 'Afganistán' },
      { value: '130', text: 'Albania' },
      { value: '131', text: 'Alemania' },
      { value: '132', text: 'Andorra' },
      { value: '133', text: 'Angola' },
      { value: '134', text: 'Antigua y Barbuda' },
      { value: '135', text: 'Arabia Saudita' },
      { value: '136', text: 'Argelia' },
      { value: '137', text: 'Argentina' },
      { value: '138', text: 'Armenia' },
      { value: '139', text: 'Australia' },
      { value: '140', text: 'Austria' },
      { value: '141', text: 'Azerbaiyán' },
      { value: '142', text: 'Bahamas' },
      { value: '143', text: 'Bangladesh' },
      { value: '144', text: 'Barbados' },
      { value: '145', text: 'Bahréin (Baréin)' },
      { value: '146', text: 'Bélgica' },
      { value: '147', text: 'Belice' },
      { value: '148', text: 'Benín' },
      { value: '149', text: 'Bielorrusia' },
      { value: '150', text: 'Birmania/Myanmar' },
      { value: '151', text: 'Bolivia' },
      { value: '152', text: 'Bosnia y Herzegovina' },
      { value: '153', text: 'Botsuana' },
      { value: '154', text: 'Brasil' },
      { value: '155', text: 'Brunéi' },
      { value: '156', text: 'Bulgaria' },
      { value: '157', text: 'Burkina Faso' },
      { value: '158', text: 'Burundi' },
      { value: '159', text: 'Bután' },
      { value: '160', text: 'Cabo Verde' },
      { value: '161', text: 'Camboya' },
      { value: '162', text: 'Camerún' },
      { value: '163', text: 'Canadá' },
      { value: '164', text: 'Catar' },
      { value: '165', text: 'Chad' },
      { value: '166', text: 'Chile' },
      { value: '167', text: 'China' },
      { value: '168', text: 'Chipre' },
      { value: '169', text: 'Ciudad del Vaticano' },
      { value: '170', text: 'Colombia' },
      { value: '171', text: 'Comoras' },
      { value: '172', text: 'Corea del Norte' },
      { value: '173', text: 'Corea del Sur' },
      { value: '174', text: 'Costa de Marfil' },
      { value: '175', text: 'Costa Rica' },
      { value: '176', text: 'Croacia' },
      { value: '177', text: 'Cuba' },
      { value: '178', text: 'Dinamarca' },
      { value: '179', text: 'Dominica' },
      { value: '180', text: 'Ecuador' },
      { value: '181', text: 'Egipto' },
      { value: '182', text: 'El Salvador' },
      { value: '183', text: 'Emiratos Árabes Unidos' },
      { value: '184', text: 'Eritrea' },
      { value: '185', text: 'Eslovaquia' },
      { value: '186', text: 'Eslovenia' },
      { value: '187', text: 'España' },
      { value: '188', text: 'Estados Unidos' },
      { value: '189', text: 'Estonia' },
      { value: '190', text: 'Etiopía' },
      { value: '191', text: 'Filipinas' },
      { value: '192', text: 'Finlandia' },
      { value: '193', text: 'Fiyi' },
      { value: '194', text: 'Francia' },
      { value: '195', text: 'Gabón' },
      { value: '196', text: 'Gambia' },
      { value: '197', text: 'Georgia' },
      { value: '198', text: 'Ghana' },
      { value: '199', text: 'Granada' },
      { value: '200', text: 'Grecia' },
      { value: '201', text: 'Guatemala' },
      { value: '202', text: 'Guyana' },
      { value: '203', text: 'Guinea' },
      { value: '204', text: 'Guinea ecuatorial' },
      { value: '205', text: 'Guinea-Bisáu' },
      { value: '206', text: 'Haití' },
      { value: '207', text: 'Honduras' },
      { value: '208', text: 'Hungría' },
      { value: '209', text: 'India' },
      { value: '210', text: 'Indonesia' },
      { value: '211', text: 'Irak' },
      { value: '212', text: 'Irán' },
      { value: '213', text: 'Irlanda' },
      { value: '214', text: 'Islandia' },
      { value: '215', text: 'Islas Marshall' },
      { value: '216', text: 'Islas Salomón' },
      { value: '217', text: 'Israel' },
      { value: '218', text: 'Italia' },
      { value: '219', text: 'Jamaica' },
      { value: '220', text: 'Japón' },
      { value: '221', text: 'Jordania' },
      { value: '222', text: 'Kazajistán' },
      { value: '223', text: 'Kenia' },
      { value: '224', text: 'Kirguistán' },
      { value: '225', text: 'Kiribati' },
      { value: '226', text: 'Kuwait' },
      { value: '227', text: 'Laos' },
      { value: '228', text: 'Lesoto' },
      { value: '229', text: 'Letonia' },
      { value: '230', text: 'Líbano' },
      { value: '231', text: 'Liberia' },
      { value: '232', text: 'Libia' },
      { value: '233', text: 'Liechtenstein' },
      { value: '234', text: 'Lituania' },
      { value: '235', text: 'Luxemburgo' },
      { value: '236', text: 'Macedonia del Norte' },
      { value: '237', text: 'Madagascar' },
      { value: '238', text: 'Malasia' },
      { value: '239', text: 'Malaui' },
      { value: '240', text: 'Maldivas' },
      { value: '241', text: 'Malí' },
      { value: '242', text: 'Malta' },
      { value: '243', text: 'Marruecos' },
      { value: '244', text: 'Mauricio' },
      { value: '245', text: 'Mauritania' },
      { value: '246', text: 'México' },
      { value: '247', text: 'Micronesia' },
      { value: '248', text: 'Moldavia' },
      { value: '249', text: 'Mónaco' },
      { value: '250', text: 'Mongolia' },
      { value: '251', text: 'Montenegro' },
      { value: '252', text: 'Mozambique' },
      { value: '253', text: 'Namibia' },
      { value: '254', text: 'Nauru' },
      { value: '255', text: 'Nepal' },
      { value: '256', text: 'Nicaragua' },
      { value: '257', text: 'Níger' },
      { value: '258', text: 'Nigeria' },
      { value: '259', text: 'Noruega' },
      { value: '260', text: 'Nueva Zelanda' },
      { value: '261', text: 'Omán' },
      { value: '262', text: 'Países Bajos' },
      { value: '263', text: 'Pakistán' },
      { value: '264', text: 'Palaos' },
      { value: '265', text: 'Panamá' },
      { value: '266', text: 'Papúa Nueva Guinea' },
      { value: '267', text: 'Paraguay' },
      { value: '268', text: 'Perú' },
      { value: '269', text: 'Polonia' },
      { value: '270', text: 'Portugal' },
      { value: '271', text: 'Reino Unido' },
      { value: '272', text: 'República Centroafricana' },
      { value: '273', text: 'República Checa' },
      { value: '274', text: 'República del Congo' },
      { value: '275', text: 'República Democrática del Congo' },
      { value: '276', text: 'República Dominicana' },
      { value: '277', text: 'República Sudafricana' },
      { value: '278', text: 'Ruanda' },
      { value: '279', text: 'Rumanía' },
      { value: '280', text: 'Rusia' },
      { value: '281', text: 'Samoa' },
      { value: '282', text: 'San Cristóbal y Nieves' },
      { value: '283', text: 'San Marino' },
      { value: '284', text: 'San Vicente y las Granadinas' },
      { value: '285', text: 'Santa Lucía' },
      { value: '286', text: 'Santo Tomé y Príncipe' },
      { value: '287', text: 'Senegal' },
      { value: '288', text: 'Serbia' },
      { value: '289', text: 'Seychelles' },
      { value: '290', text: 'Sierra Leona' },
      { value: '291', text: 'Singapur' },
      { value: '292', text: 'Siria' },
      { value: '293', text: 'Somalia' },
      { value: '294', text: 'Sri Lanka' },
      { value: '295', text: 'Suazilandia' },
      { value: '296', text: 'Sudán' },
      { value: '297', text: 'Sudán del Sur' },
      { value: '298', text: 'Suecia' },
      { value: '299', text: 'Suiza' },
      { value: '300', text: 'Surinam' },
      { value: '301', text: 'Tailandia' },
      { value: '302', text: 'Tanzania' },
      { value: '303', text: 'Tayikistán' },
      { value: '304', text: 'Timor Oriental (Timor-Leste)' },
      { value: '305', text: 'Togo' },
      { value: '306', text: 'Tonga' },
      { value: '307', text: 'Trinidad y Tobago' },
      { value: '308', text: 'Túnez' },
      { value: '309', text: 'Turkmenistán' },
      { value: '310', text: 'Turquía' },
      { value: '311', text: 'Tuvalu' },
      { value: '312', text: 'Ucrania' },
      { value: '313', text: 'Uganda' },
      { value: '314', text: 'Uruguay' },
      { value: '315', text: 'Uzbekistán' },
      { value: '316', text: 'Vanuatu' },
      { value: '317', text: 'Venezuela' },
      { value: '318', text: 'Vietnam' },
      { value: '319', text: 'Yemen' },
      { value: '320', text: 'Yibuti (Djibouti)' },
      { value: '321', text: 'Zambia' },
      { value: '322', text: 'Zimbabue' },
        ],
    e6: 1,
    nestudios:Estudios,
    ListDepartamento: Departamentos,
    ListMcipios: Mcipios,
    ListTipoId:[],
    ListGenero:[],
    ListCivil:[],
    Vpais:[],
    VDepto:"",
    VMuni:"",
    FiltraMunicipio:"",
    telRules:"",
    VTelefono:"",
    DireccionlRules:"",
    VDireccion:"",
    //Información Sociodemografica
    testPreguntas:['1.aaaaa','2.bbbbbb','3.cccccc','4.dddddddddddd'],
    VprimerNombre:"",
    VsegundoNombre:"",
    VprimerApellido:"",
    VsegundoApellido:"",

    Vpais:"",
    VtipoDocumeto:"",
    Videntificacion:"",	
    Vemail:"",
    VtelefonoPrefijos:"",
    VphoneWhatsapp:"",

    Vsexo:"",
    Vedad:"",
    Vgenero:"",
    VestadoCivil:"",
    VnivelEducativo:"",
    Vocupacion:"",
    Vreligion:"",
    Vestrato:"",
    Vocupacion_actual:"",
    VrazaEtnia:"",
    VtiempoDiagnostico:"",
    VtratamientoAntirretroviral:"",
    VcodeDocumentoFirma:"",
    // Variables preguntas quiestionario
    VCambio_salud_anio:'',
    VIntensidad_dolor_actividades:'',
    VInterferencia_dolor_actividades:'',
    VLimitacion_actividad_fisica:'',
    VLimitacion_trabajo_domesticas:'',
    VDificultad_caminar_escaleras:'',
    VDificultad_agacharse_recoger_objetos:'',
    VDificultad_vestirse:'',
    VDificultad_comer:'',
    VDependencia_ayuda_diarias:'',
    VIntensidad_dolor:'',
    VImpacto_dolor_actividades_habituales:'',
    VLimitacion_estado_salud:'',
    VEstado_salud_ultimos_meses:'',
    VLimitacion_estado_salud_ultimo_12_mes:'',
    VLimitacion_estado_salud_ultimos_5_anios:'',
    VPercepcion_salud_actual:'',
    VCambio_salud_ultimo_anio:'',
    VSentimiento_energia:'',
    VSentimiento_cansancio:'',
    VDificultad_actividades_falta_energia:'',
    VInterferencia_cansancio_actividades:'',
    VLimitacion_realizar_actividades_sociales:'',
    VSentimiento_verguenza_situaciones_sociales:'',
    VLimitacion_trabajo_estudios:'',
    VDificultad_realizar_tareas:'',
    VDificultad_cuidar_casa:'',
    VDificultad_cuidar_otras_personas:'',
    VDificultad_mantener_estado_animo:'',
    VSentimiento_nerviosismo_inquietud:'',
    VDificultad_actividades_sentirse_triste_deprimido:'',
    VSentimiento_bienestar_emocional:'',
    VDificultad_concentrarse_mantener_atencion:'',
    VDificultad_tomar_decisiones:'',
    VDificultad_dormir:'',
    //Información Rules 
    emailRules: [
        v => !!v || 'Campo requerido',
        v => /.+@.+\..+/.test(v) || 'El campo debe ser un correo electrónico válido',
        v => (v && v.length <= 50 && v.length > 5) || 'El campo debe contener entre 6 y 50 caracteres',
        v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || 'Campo no válido, revise el formato del correo electrónico'
    ],

    nameRules: [
        v => !!v || 'Campo requerido',
        v => (v && v.length <= 50 && v.length > 3) || 'El campo debe contener entre 3 y 50 caracteres',
        v => /^[a-zA-Z\ ]{3,50}$/.test(v) || 'Campo no valido'
      ],
    selectRules:[
      v => !!v || 'Este campo es requerido'],
    nroEdadRules:[
        v => !!v || 'El edad es requerida',
        v => /^[0-9]{1,3}$/.test(v) || 'Edad es incorrecta'
      ],
    nroIdRules:[
        v => !!v || 'El número de documento es requerido',
        v => /^[0-9]{3,12}$/.test(v) || 'Número documento incorrecto'
      ], 
    nroPhoneRules:[
        v => !!v || 'El número de documento es requerido',
        v => /^[0-9]{10,20}$/.test(v) || 'Número documento incorrecto'
      ], 

    textdata: [
        v => !!v || 'Campo requerido',
        v => (v && v.length <= 50 && v.length > 1) || 'El campo debe contener entre 2 y 50 caracteres',
        v => /^[a-zA-Z\ #,.áéíóú-]{2,50}$/.test(v) || 'Campo no valido'
      ],

      CulminadoEducacion:[
        { value: 'Culminado', text: 'Culminado' },
        { value: 'En Proceso', text: 'En proceso'},
        { value: 'Sin Finalizar', text: 'Sin Finalizar'},
        ],
        TipoEducacion : [
          { value: 'Especializacion', text: 'Especialización' },
          { value: 'Tecnica', text: 'Técnica'},
          { value: 'Tecnologica', text: 'Tecnológica' },
          { value: 'Tecnologica Especializada', text: 'Tecnológica Especializada' },
          { value: 'Universitaria', text: 'Universitaria' },
          { value: 'Maestria o Magister', text: 'Maestría o Magister' },
          { value: 'Doctorado o PHD', text: 'Doctorado o PHD' },
        ],       
        //INFORMACION ACADEMICA
 FormacionValid:true,
        VModalidadAcademida:"",
        VCentroEducativo:"",
        VSemestreAprovado:"",
        VEstadoEducativo:"",
        VTituloObtenido:"",
        VFechaFinal:"",

        // VEducativo:"",
        // VEstudio:"",
        // VAñoInicial:"",
        // VMesInicial:"",
        // VAñoFinal:"",
        // VMesFinal:"",
        // VEeducacion:"",
        valid: true,
        eeducacion: EstadoEstudio, 
        alertdeañoinicial:0,
 
         
        
        ceducativo: [
        v => !!v || 'Descripción del centro educativo es requerido',
        v => (v && v.length <= 50) || 'Descripción debe ser menor que 50 caracteres',
      ],
      ctituloobtenido: [
        v => !!v || 'Descripción del titulo obtenido es requerido',
        v => (v && v.length <= 50) || 'Descripción debe ser menor que 50 caracteres',
      ],

      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Modalidad Academica',
          align: 'start',
          sortable: false,
          value: 'ModalidadAcademica',
        },
        { text: 'Semestres Aprobados', value: 'SemestresAprobados' },
        { text: 'Graduado', value: 'EstadoEducativo' },
        { text: 'Titulo Obtenido', value: 'TituloObtenido' },
        { text: 'Universidad Otorga', value: 'UniversidadOtorga' },
        { text: 'Fecha Grado', value: 'FechaFinal' },
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      dessertsProfes: [],
      dessertsIdioma: [],
      dessertsVivienda: [],
      editedIndex: -1,
      editedItem: {
        SemestresAprobados: '',
        EstadoEducativo: '',
        TituloObtenido: '',
        UniversidadOtorga: '',
        FechaFinal: '',
        CedulaMasonica:localStorage.cedula,
      },
      defaultItem: {
        SemestresAprobados: '',
        EstadoEducativo: '',
        TituloObtenido: '',
        UniversidadOtorga: '',
        FechaFinal: '',
        CedulaMasonica:localStorage.cedula,
      },


      dialogProfes: false,
      dialogIdioma: false,
      dialogVivienda: false,
      dialogDeleteProfes: false,
      dialogDeleteIdioma: false,
      dialogDeleteVivienda: false,
      headersProfes: [
        {
          text: 'Empresas o firmas con las cuales  ha trabajado',
          align: 'start',
          sortable: false,
          value: 'Empresa',
        },
        { text: 'Cargo Desempeñado', value: 'CargoDesempeniado' },
        { text: 'Año', value: 'AniosTrabajados' },  
        { text: 'Pais de la empresa', value: 'PaisEmpresa'},
        { text: 'Ciudad de la empresa', value: 'CiudadEmpresa'},
        { text: 'Pais de la empresa', value: 'PaisEmpresa'},
        { text: 'Email de la empresa', value: 'EmailEmpresa'},
        { text: 'Telefono de la empresa', value: 'TelefonoEmpresa'},
        { text: 'Celular de la empresa', value: 'TelefonoCelEmpresa'},

        { text: 'Actions', value: 'actions', sortable: false },
        
      ],
      headersIdioma: [
        {
          text: 'Idioma',
          align: 'start',
          sortable: false,
          value: 'Idioma',
        },
        { text: 'Nivel', value: 'Nivel' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headersVivienda: [
        {
          text: 'Dirección',
          align: 'start',
          sortable: false,
          value: 'Direccion',
        },
        { text: 'Ciudad', value: 'Ciudad' },
        { text: 'Barrio', value: 'Barrio' },
        { text: 'Años', value: 'Anios' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndexProfes: -1,
      editedItemProfes: {
        Empresa: '',
        CargoDesempeniado: '',
        AniosTrabajados: '',
        CedulaMasonica:localStorage.cedula,
        PaisEmpresa : '',
        CiudadEmpresa : '',
        EmailEmpresa:'',
        TelefonoEmpresa :'',
        TelefonoCelEmpresa :'',

      },
      editedIndexIdioma: -1,
      editedItemIdioma: {
        Idioma: '',
        Nivel: '',
        CedulaMasonica:localStorage.cedula,
      },
      editedIndexVivienda: -1,
      editedItemVivienda: {
        Direccion: '',
        Ciudad: '',
        Barrio:'',
        Anios: '',
        CedulaMasonica:localStorage.cedula,
      },
      defaultItemProfes: {
        Empresa: '',
        CargoDesempeniado: '',
        AniosTrabajados: '',
        CedulaMasonica:localStorage.cedula,
      },
      defaultItemIdioma: {
        Idioma: '',
        Nivel: '',
        CedulaMasonica:localStorage.cedula,
      },
      defaultItemVivienda: {
        Direccion: '',
        Ciudad: '',
        Anios: '',
        CedulaMasonica:localStorage.cedula,
      },

    }),

    

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      dialogProfes (val) {
        val || this.closeProf()
      },
      dialogDeleteProfes (val) {
        val || this.closeDeleteProf()
      },
      dialogIdioma (val) {
        val || this.closeIdioma()
      },
      dialogDeleteIdioma (val) {
        val || this.closeDeleteIdioma()
      },
      dialogVivienda (val) {
        val || this.closeVivienda()
      },
      dialogDeleteVivienda (val) {
        val || this.closeDeleteVivienda()
      },
    },

    created () {
      this.initialize()
    },


  beforeMount() { 
    // store.dispatch('GetDatosClasificacionTipo').then(() => this.CargarPreguntas());
    // store.dispatch('GetInfoPersonal').then(() => this.CargaInfoPersonal())
    // store.dispatch('GetInfoFamiliar').then(() => this.CargaInfoFamiliar())
    // store.dispatch('GetInfoAcademica').then(()=> this.CargaInfoAcademica())
    // store.dispatch('GetInfoProfesional').then(()=> this.CargaInfoProfesional())
    // store.dispatch('GetInfoIdioma').then(()=> this.CargaInfoIdioma())
    // store.dispatch('GetInfoVivienda').then(()=> this.CargaInfoVivienda())
    // store.dispatch('GetInfoFinanciera').then(()=> this.CargaInfoFinanciera())
    // store.dispatch('GetInfoEstadoLogia').then(()=> this.CargaInfoEstadoLogia())
    // store.dispatch('GetInfoSalud').then(()=> this.CargaInfoSalud())
    // store.dispatch('GetInfoGeneral').then(()=> this.CargaInfoGeneral())
      if (store.state.IndexFormacion !== '' && store.state.AccionFormacion == "Editar"){

      for(let i=0; i< store.state.FormacionAcademica.length; i++){
          
          if( i == store.state.IndexFormacion)
          {                              
               var FiltroNivel =  this.nestudios.filter(function(nivel) {
                    return nivel.text == store.state.FormacionAcademica[i].Nivel;
                });
          }
        } 
      }
      {
    }

  },

  computed:{
    ...mapState(['DatosClasificacionTipo',
                  'infoPersonal',
                  'infoFinanciera',
                  'infoEstadoLogia',
                  'infoSalud',
                  'infoGeneral',
                  'infoAcademica',
                  'infoProfesional',
                  'infoFamiliar',
                  'infoIdioma',
                  'infoVivienda',
                  'user',
                  'TipoIdentificacion',
                  'AñoInicial',
                  'MesInicial',
                  'AñoFinal',
                  'MesFinal',
                  'FormacionAcademica',
                  'IndexFormacion',
                  'AccionFormacion']),
    
    FiltroTipoDocumento: function () {
          var arregloTipoDocumento = [];
          this.ListTipoId = this.DatosClasificacionTipo.filter(tipoid => tipoid.IdClasificacion == 1);
          var idtemp = JSON.parse(JSON.stringify(this.ListTipoId));
          for (const property in idtemp) {
            arregloTipoDocumento.push(idtemp[property].text);
          }
          return arregloTipoDocumento;
        },
    FiltroGenero: function () {
          var arregloGenero = [];
          this.ListGenero = this.DatosClasificacionTipo.filter(Gen => Gen.IdClasificacion == 2);
          var temp = JSON.parse(JSON.stringify(this.ListGenero));
          for (const property in temp) {
            arregloGenero.push(temp[property].text);
          }
          return arregloGenero;
        },
    FiltroEstadoCivil: function () {
          var arregloCivil = [];
          this.ListCivil = this.DatosClasificacionTipo.filter(civ => civ.IdClasificacion == 3);
          var tempciv = JSON.parse(JSON.stringify(this.ListCivil));
          for (const property in tempciv) {
            arregloCivil.push(tempciv[property].text);
          }
          return arregloCivil;
        },
    FiltroDepto: function () {
          return this.ListDepartamento = Departamentos.filter(Depto => Depto.CodPais ==this.Vpais);
        },
    FiltroMcipios: function () {
          return this.ListMcipios = Mcipios.filter(Mpio => Mpio.depto ==this.VDepto);
        },
   
  },

  methods: {
    ...mapActions(['GetDatosClasificacionTipo','GetAsignarInfoPersonal']),
    CargaInfoAcademica(){ 
       this.initialize();
    },
    CargaInfoProfesional(){
       this.initializeProf();
    },
    CargaInfoIdioma(){   
       this.initializeIdioma();
    },
    CargaInfoVivienda(){   
       this.initializeVivienda();
    },
    editarinfoProfesional(){
      this.$refs.form.validate();
      this.valid=false;
      store.commit('UpdateAsignacionInformacionProfesional', this.dessertsProfes)
      store.dispatch('PostInfoProfesional');
    },
    editarinfoIdioma(){
      this.$refs.form.validate();
      this.valid=false;
      store.commit('UpdateAsignacionInformacionIdioma', this.dessertsIdioma)
      store.dispatch('PostInfoIdioma');
    },
    editarinfoVivienda(){
      this.$refs.form.validate();
      this.valid=false;
      store.commit('UpdateAsignacionInformacionVivienda', this.dessertsVivienda)
      store.dispatch('PostInfoVivienda');
    },

    CargarPreguntas(){
      console.log(this.DatosClasificacionTipo)
    },
    CargaInfoPersonal(){
      console.log(this.Paises.filter(pais => pais.text ==store.state.infoPersonal[0].Pais)[0].value)
      this.VprimerNombre=store.state.infoPersonal[0].Primer_nombre;       
      this.VsegundoNombre=store.state.infoPersonal[0].Segundo_nombre;    
      this.VprimerApellido =store.state.infoPersonal[0].Primer_apellido;    
      this.VsegundoApellido=store.state.infoPersonal[0].Segundo_apellido;   
      this.Vpais= this.Paises.filter(pais => pais.text ==store.state.infoPersonal[0].Pais)[0].value;
      this.VtipoDocumeto=store.state.infoPersonal[0].TipoDocumeto;
      this.Videntificacion=store.state.infoPersonal[0].Identificacion;	
      this.Vemail=store.state.infoPersonal[0].Email;
      this.VtelefonoPrefijos=store.state.infoPersonal[0].TelefonoPrefijo;
      this.VphoneWhatsapp =store.state.infoPersonal[0].PhoneWhatsapp;
      this.Vedad=store.state.infoPersonal[0].Edad;		
      this.Vsexo=store.state.infoPersonal[0].Sexo;		        
      this.Vgenero=store.state.infoPersonal[0].Genero;
      this.VestadoCivil=store.state.infoPersonal[0].Estado_civil;
      this.VnivelEducativo=store.state.infoPersonal[0].Nivel_educativo;
      this.Vocupacion=store.state.infoPersonal[0].Ocupacion;
      this.Vreligion=store.state.infoPersonal[0].Religion;
      this.Vestrato=store.state.infoPersonal[0].Estrato_socioeconomico;
      this.Vocupacion_actual=store.state.infoPersonal[0].Ocupacion_actual;
      this.VrazaEtnia=store.state.infoPersonal[0].Raza_etnia;
      this.VtiempoDiagnostico=store.state.infoPersonal[0].Tiempo_diagnostico;
      this.VtratamientoAntirretroviral=store.state.infoPersonal[0].Tratamiento_antirretroviral;
      this.VcodeDocumentoFirma=store.state.infoPersonal[0].codeDocumentoFirma;
    },
    CargaInfoCuestionario(){
      this.VCambio_salud_anio= store.state.infoCuestionario[0].Cambio_salud_anio;
      this.VIntensidad_dolor_actividades= store.state.infoCuestionario[0].Intensidad_dolor_actividades;
      this.VInterferencia_dolor_actividades= store.state.infoCuestionario[0].Interferencia_dolor_actividades;
      this.VLimitacion_actividad_fisica= store.state.infoCuestionario[0].Limitacion_actividad_fisica;
      this.VLimitacion_trabajo_domesticas= store.state.infoCuestionario[0].Limitacion_trabajo_domesticas;
      this.VDificultad_caminar_escaleras= store.state.infoCuestionario[0].Dificultad_caminar_escaleras;
      this.VDificultad_agacharse_recoger_objetos= store.state.infoCuestionario[0].Dificultad_agacharse_recoger_objetos;
      this.VDificultad_vestirse= store.state.infoCuestionario[0].Dificultad_vestirse;
      this.VDificultad_comer= store.state.infoCuestionario[0].Dificultad_comer;
      this.VDependencia_ayuda_diarias= store.state.infoCuestionario[0].Dependencia_ayuda_diarias;
      this.VIntensidad_dolor= store.state.infoCuestionario[0].Intensidad_dolor;
      this.VImpacto_dolor_actividades_habituales= store.state.infoCuestionario[0].Impacto_dolor_actividades_habituales;
      this.VLimitacion_estado_salud= store.state.infoCuestionario[0].Limitacion_estado_salud;
      this.VEstado_salud_ultimos_meses= store.state.infoCuestionario[0].Estado_salud_ultimos_meses;
      this.VLimitacion_estado_salud_ultimo_12_mes= store.state.infoCuestionario[0].Limitacion_estado_salud_ultimo_12_mes;
      this.VLimitacion_estado_salud_ultimos_5_anios= store.state.infoCuestionario[0].Limitacion_estado_salud_ultimos_5_anios;
      this.VPercepcion_salud_actual= store.state.infoCuestionario[0].Percepcion_salud_actual;
      this.VCambio_salud_ultimo_anio= store.state.infoCuestionario[0].Cambio_salud_ultimo_anio;
      this.VSentimiento_energia= store.state.infoCuestionario[0].Sentimiento_energia;
      this.VSentimiento_cansancio= store.state.infoCuestionario[0].Sentimiento_cansancio;
      this.VDificultad_actividades_falta_energia= store.state.infoCuestionario[0].Dificultad_actividades_falta_energia;
      this.VInterferencia_cansancio_actividades= store.state.infoCuestionario[0].Interferencia_cansancio_actividades;
      this.VLimitacion_realizar_actividades_sociales= store.state.infoCuestionario[0].Limitacion_realizar_actividades_sociales;
      this.VSentimiento_verguenza_situaciones_sociales= store.state.infoCuestionario[0].Sentimiento_verguenza_situaciones_sociales;
      this.VLimitacion_trabajo_estudios= store.state.infoCuestionario[0].Limitacion_trabajo_estudios;
      this.VDificultad_realizar_tareas= store.state.infoCuestionario[0].Dificultad_realizar_tareas;
      this.VDificultad_cuidar_casa= store.state.infoCuestionario[0].Dificultad_cuidar_casa;
      this.VDificultad_cuidar_otras_personas= store.state.infoCuestionario[0].Dificultad_cuidar_otras_personas;
      this.VDificultad_mantener_estado_animo= store.state.infoCuestionario[0].Dificultad_mantener_estado_animo;
      this.VSentimiento_nerviosismo_inquietud= store.state.infoCuestionario[0].Sentimiento_nerviosismo_inquietud;
      this.VDificultad_actividades_sentirse_triste_deprimido= store.state.infoCuestionario[0].Dificultad_actividades_sentirse_triste_deprimido;
      this.VSentimiento_bienestar_emocional= store.state.infoCuestionario[0].Sentimiento_bienestar_emocional;
      this.VDificultad_concentrarse_mantener_atencion= store.state.infoCuestionario[0].Dificultad_concentrarse_mantener_atencion;
      this.VDificultad_tomar_decisiones= store.state.infoCuestionario[0].Dificultad_tomar_decisiones;
      this.VDificultad_dormir= store.state.infoCuestionario[0].Dificultad_dormir;
      this.Videntificacion= store.state.infoCuestionario[0].Identificacion;
    },
    CargaInfoFamiliar(){
      this.VNombreApellidoPadre=store.state.infoFamiliar[0].NombreApellidoPadre;
      this.VNombreApellidoMadre=this.infoFamiliar[0].NombreApellidoMadre;
      this.VNombreApellidoPareja=this.infoFamiliar[0].NombreApellidoPareja;
      this.VVivePadre=this.infoFamiliar[0].VivePadre;
      this.VViveMadre=this.infoFamiliar[0].ViveMadre;
      this.VVivePareja=this.infoFamiliar[0].VivePareja;
      this.VOpinionParejaMasoneria=this.infoFamiliar[0].OpinionParejaMasoneria;
      this.VPorqueOpinionPareja=this.infoFamiliar[0].PorqueOpinionPareja;
      this.VTieneHijos=this.infoFamiliar[0].TieneHijos;
      this.VNumeroHijos=this.infoFamiliar[0].NumeroHijos;
      this.VConviveHijos=this.infoFamiliar[0].ConviveHijos;
 
    },
    CargaInfoFinanciera(){
      this.VPersonasAcargo=store.state.infoFinanciera[0].PersonasAcargo;
      this.VIngresoMensual=store.state.infoFinanciera[0].IngresoMensual;
      this.VRentas=store.state.infoFinanciera[0].Rentas;
      this.VOtrosIngresos=store.state.infoFinanciera[0].OtrosIngresos;
      this.VTotalIngresos=store.state.infoFinanciera[0].TotalIngresos;
      this.VPatrimonio=store.state.infoFinanciera[0].Patrimonio;
      this.VPatrimonioRepresentado=store.state.infoFinanciera[0].PatrimonioRepresentado;
      this.VCasaAlquilada=store.state.infoFinanciera[0].CasaAlquilada;
      this.VValorArrendamiento=store.state.infoFinanciera[0].ValorArrendamiento;
      this.VEgresosMensuales=store.state.infoFinanciera[0].EgresosMensuales;
 
    },
    CargaInfoEstadoLogia(){
      this.VTallerLogia=store.state.infoEstadoLogia[0].Taller;
      this.VGradoLogia=store.state.infoEstadoLogia[0].Grado;
 
    },
    CargaInfoSalud(){
      this.VTipoSangre=store.state.infoSalud[0].TipoSangre;
      this.VRh=store.state.infoSalud[0].Rh;
      this.VSeguroVida=store.state.infoSalud[0].SeguroVida;
      this.VSeguroMedico=store.state.infoSalud[0].SeguroMedico;
      this.VCualSeguro=store.state.infoSalud[0].CualSeguro;
      this.VEps=store.state.infoSalud[0].Eps;
      this.VEstadoSalud=store.state.infoSalud[0].EstadoSalud;
 
    },
    CargaInfoGeneral(){
      this.VParienteMason=store.state.infoGeneral[0].ParienteMason;
      this.VNombreParienteMason=store.state.infoGeneral[0].NombreParienteMason;
      this.VLogiaPariente=store.state.infoGeneral[0].LogiaPariente;
      this.VCiudadLogiaPariente=store.state.infoGeneral[0].CiudadLogiaPariente;
      this.VSugeridoMasoneria=store.state.infoGeneral[0].SugeridoMasoneria;
      this.VQuienSugerido=store.state.infoGeneral[0].QuienSugerido;
      this.VFormuladoSolicitud=store.state.infoGeneral[0].FormuladoSolicitud;
      this.VSolicitudDonde=store.state.infoGeneral[0].SolicitudDonde;
      this.VSolicitudCuando=store.state.infoGeneral[0].SolicitudCuando;
      this.VSolicitudLogia=store.state.infoGeneral[0].SolicitudLogia;
      this.VVinculoPresentaMason=store.state.infoGeneral[0].VinculoPresentaMason;
      this.VEntiendeMasoneria=store.state.infoGeneral[0].EntiendeMasoneria;
      this.VOportunidadPertenecer=store.state.infoGeneral[0].OportunidadPertenecer;
      this.VProyectVidaMasoneria=store.state.infoGeneral[0].ProyectVidaMasoneria;
      this.VEntiendeSociedadSecreta=store.state.infoGeneral[0].EntiendeSociedadSecreta;
      this.VPerteneceSociedadSecreta=store.state.infoGeneral[0].PerteneceSociedadSecreta;
      this.VCualPerteneceSociedad=store.state.infoGeneral[0].CualPerteneceSociedad;
      this.VPrincipioCreador=store.state.infoGeneral[0].PrincipioCreador;
      this.VRazonVida=store.state.infoGeneral[0].RazonVida;
      this.VAporteMejorarHumanidad=store.state.infoGeneral[0].AporteMejorarHumanidad;
      this.VPorquePrincipioCreador=store.state.infoGeneral[0].PorquePrincipioCreador;

    },
    editarinfoHabeasData(){
      this.$refs.form.validate();
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
      store.dispatch('GetInfoHabeasData').then(result => {
        console.log('Resultado de GetInfoHabeasData:', result);
        if (result) {
          console.log('La firma ha terminado.');
          this.valid=false;
          Swal.fire({
            icon: 'success',
            title: 'Persona firmo, ',
            text: 'Puedes continuar',
            confirmButtonColor: 'green'
          });
        } else {
          console.log('La firma no ha terminado o hubo un error.');
          this.valid=true;
          Swal.fire({
              icon: 'error',
              title: 'No ha firmado aun',
              text: 'intente mas tarde',
              allowOutsideClick: false,
              backdrop: false,
              confirmButtonColor: '#ff0000a8'
            });
        }
      });
      // store.commit('UpdateAsignacionInformacionAcademica', this.desserts)
      // store.dispatch('PostInfoHabeasData');
    },
    enviarinfoHabeasData(){
      this.$refs.form.validate();
      this.valid=false;
      store.dispatch('PostInfoHabeasData');

      // store.commit('UpdateAsignacionInformacionAcademica', this.desserts)
      // store.dispatch('PostInfoHabeasData');
    },
    initialize () {
      this.desserts.splice(0, this.desserts.length);
      for (let item = 0; item < store.state.infoAcademica.length; item++) {
        this.desserts.push({
          ModalidadAcademica: store.state.infoAcademica[item].ModalidadAcademica,
          SemestresAprobados: store.state.infoAcademica[item].SemestresAprobados,
          TituloObtenido: store.state.infoAcademica[item].TituloObtenido,
          UniversidadOtorga: store.state.infoAcademica[item].UniversidadOtorga,
          EstadoEducativo: store.state.infoAcademica[item].EstadoEducativo,
          FechaFinal: store.state.infoAcademica[item].FechaFinal,
          CedulaMasonica: store.state.infoAcademica[item].CedulaMasonica
        })
      }
    },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },

      initializeProf () {
      this.dessertsProfes.splice(0, this.dessertsProfes.length);
      for (let item = 0; item < store.state.infoProfesional.length; item++) {
        this.dessertsProfes.push({
          Empresa: store.state.infoProfesional[item].Empresa,
          CargoDesempeniado: store.state.infoProfesional[item].CargoDesempeniado,
          AniosTrabajados: store.state.infoProfesional[item].AniosTrabajados,
          CedulaMasonica: store.state.infoProfesional[item].CedulaMasonica,
          PaisEmpresa: store.state.infoProfesional[item].PaisEmpresa,
          CiudadEmpresa: store.state.infoProfesional[item].CiudadEmpresa,
          EmailEmpresa: store.state.infoProfesional[item].EmailEmpresa,
          TelefonoEmpresa: store.state.infoProfesional[item].TelefonoEmpresa,
          TelefonoCelEmpresa: store.state.infoProfesional[item].TelefonoCelEmpresa        
          
        })
      }
    },

      editItemProf (item) {
        this.editedIndexProfes = this.dessertsProfes.indexOf(item)
        this.editedItemProfes = Object.assign({}, item)
        this.dialogProfes = true
      },

      deleteItemProf (item) {
        this.editedIndexProfes = this.dessertsProfes.indexOf(item)
        this.editedItemProfes = Object.assign({}, item)
        this.dialogDeleteProfes = true
      },

      deleteItemConfirmProf () {
        this.dessertsProfes.splice(this.editedIndexProfes, 1)
        this.closeDeleteProf()
      },

      closeProf () {
        this.dialogProfes = false
        this.$nextTick(() => {
          this.editedItemProfes = Object.assign({}, this.defaultItemProfes)
          this.editedIndexProfes = -1
        })
      },

      closeDeleteProf () {
        this.dialogDeleteProfes = false
        this.$nextTick(() => {
          this.editedItemProfes = Object.assign({}, this.defaultItemProfes)
          this.editedIndexProfes = -1
        })
      },

      saveProf () {
        if (this.editedIndexProfes > -1) {
          Object.assign(this.dessertsProfes[this.editedIndexProfes], this.editedItemProfes)
        } else {
          this.dessertsProfes.push(this.editedItemProfes)
        }
        this.closeProf()
      },

      initializeIdioma () {
      this.dessertsIdioma.splice(0, this.infoIdioma.length);
      for (let item = 0; item < store.state.infoIdioma.length; item++) {
        this.dessertsIdioma.push({
          Nivel: store.state.infoIdioma[item].Nivel,
          Idioma: store.state.infoIdioma[item].Idioma,
          CedulaMasonica: store.state.infoIdioma[item].CedulaMasonica
        })
      }
    },

      editItemIdioma (item) {
        this.editedIndexIdioma = this.dessertsIdioma.indexOf(item)
        this.editedItemIdioma = Object.assign({}, item)
        this.dialogIdioma = true
      },

      deleteItemIdioma (item) {
        this.editedIndexIdioma = this.dessertsIdioma.indexOf(item)
        this.editedItemIdioma = Object.assign({}, item)
        this.dialogDeleteIdioma = true
      },

      deleteItemConfirmIdioma () {
        this.dessertsIdioma.splice(this.editedIndexIdioma, 1)
        this.closeDeleteProf()
      },

      closeIdioma () {
        this.dialogIdioma = false
        this.$nextTick(() => {
          this.editedItemIdioma = Object.assign({}, this.defaultItemIdioma)
          this.editedIndexIdioma = -1
        })
      },

      closeDeleteIdioma () {
        this.dialogDeleteIdioma = false
        this.$nextTick(() => {
          this.editedItemIdioma = Object.assign({}, this.defaultItemIdioma)
          this.editedIndexIdioma = -1
        })
      },

      saveIdioma () {
        if (this.editedIndexIdioma > -1) {
          Object.assign(this.dessertsIdioma[this.editedIndexIdioma], this.editedItemIdioma)
        } else {
          this.dessertsIdioma.push(this.editedItemIdioma)
        }
        this.closeIdioma()
      },

      initializeVivienda () {
      this.dessertsVivienda.splice(0, this.infoVivienda.length);
      for (let item = 0; item < store.state.infoVivienda.length; item++) {
        this.dessertsVivienda.push({
          Direccion: store.state.infoVivienda[item].Direccion,
          Ciudad: store.state.infoVivienda[item].Ciudad,
          Anios: store.state.infoVivienda[item].Anios,
          CedulaMasonica: store.state.infoVivienda[item].CedulaMasonica,
          Barrio: store.state.infoVivienda[item].Barrio
        })
      }
    },

      editItemVivienda (item) {
        this.editedIndexVivienda = this.dessertsVivienda.indexOf(item)
        this.editedItemVivienda = Object.assign({}, item)
        this.dialogVivienda = true
      },

      deleteItemVivienda (item) {
        this.editedIndexVivienda = this.dessertsVivienda.indexOf(item)
        this.editedItemVivienda = Object.assign({}, item)
        this.dialogDeleteVivienda = true
      },

      deleteItemConfirmVivienda () {
        this.dessertsVivienda.splice(this.editedIndexVivienda, 1)
        this.closeDeleteProf()
      },

      closeVivienda () {
        this.dialogVivienda = false
        this.$nextTick(() => {
          this.editedItemVivienda = Object.assign({}, this.defaultItemVivienda)
          this.editedIndexVivienda= -1
        })
      },

      closeDeleteVivienda() {
        this.dialogDeleteVivienda = false
        this.$nextTick(() => {
          this.editedItemVivienda = Object.assign({}, this.defaultItemVivienda)
          this.editedIndexVivienda = -1
        })
      },

      saveVivienda() {
        if (this.editedIndexVivienda > -1) {
          Object.assign(this.dessertsVivienda[this.editedIndexVivienda], this.editedItemVivienda)
        } else {
          this.dessertsVivienda.push(this.editedItemVivienda)
        }
        this.closeVivienda()
      },
    



    buscarPaciente(){

      console.log("buscando paciente")
      // this.$refs.form.validate();
      if (this.VtipoDocumeto != "" & this.Videntificacion != "" ){
        const post = {
          "TipoDocumeto": this.VtipoDocumeto,
          "Identificacion": this.Videntificacion,	
        }
        store.commit('AsignacionInformacionPersonal', post );
        store.dispatch('GetInfoPersonal').then(() => this.CargaInfoPersonal())
        store.dispatch('GetInfoCuestionario').then(() => this.CargaInfoCuestionario())
        
      }
        
      //   store.dispatch('PostInfoPersonal');
      //   this.valid=false;
      //  }else{
      //   Swal.fire({
      //         icon: 'error',
      //         title: 'Error',
      //         text: 'Se debe llenar todos los campos',
      //         allowOutsideClick: false,
      //         backdrop: false,
      //         confirmButtonColor: '#ff0000a8'
      //       });
        
      //  }
      

    },

    enviarInfoSociodemografica(){
      this.$refs.form.validate();
      if (this.VprimerNombre != "" & this.VsegundoNombre != "" & this.VprimerApellido != "" & this.VsegundoApellido != "" & this.Vsexo != "" & this.Vedad != "" & 
      this.Vgenero != "" & this.VestadoCivil != "" & this.VnivelEducativo != "" & this.Vocupacion != "" & this.Vreligion != "" & this.Vestrato !="" & this.Vocupacion !=""
      & this.VrazaEtnia !="" & this.VtiempoDiagnostico !="" & this.VtratamientoAntirretroviral !="" & this.Vpais!="" & this.VtipoDocumeto!="" & this.Videntificacion!="" & 
      this.Vemail!="" & this.VtelefonoPrefijos!="" & this.VphoneWhatsapp!=""  ){
        const post = {
          "Primer_nombre": this.VprimerNombre,       
          "Segundo_nombre": this.VsegundoNombre,    
          "Primer_apellido": this.VprimerApellido ,    
          "Segundo_apellido": this.VsegundoApellido ,  
          "Pais": this.Paises.filter(pais => pais.value ==this.Vpais)[0].text,
          "TipoDocumeto": this.VtipoDocumeto,
          "Identificacion": this.Videntificacion,	
          "Email": this.Vemail,
          "TelefonoPrefijo": this.VtelefonoPrefijos,
          "PhoneWhatsapp": this.VphoneWhatsapp, 
          "Edad": this.Vedad,		
          "Sexo": this.Vsexo,		        
          "Genero": this.Vgenero,
          "Estado_civil": this.VestadoCivil,
          "Nivel_educativo": this.VnivelEducativo,
          "Ocupacion": this.Vocupacion,
          "Religion": this.Vreligion,
          "Estrato_socioeconomico": this.Vestrato,
          "Ocupacion_actual": this.Vocupacion_actual,
          "Raza_etnia": this.VrazaEtnia,
          "Tiempo_diagnostico": this.VtiempoDiagnostico,
          "Tratamiento_antirretroviral": this.VtratamientoAntirretroviral,
          "codeDocumentoFirma":this.VcodeDocumentoFirma,
        }
        
        store.commit('AsignacionInformacionPersonal', post );
        store.dispatch('PostInfoPersonal');
        this.valid=false;
       }else{
        Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Se debe llenar todos los campos',
              allowOutsideClick: false,
              backdrop: false,
              confirmButtonColor: '#ff0000a8'
            });
        
       }
      

    },

    enviarInfoCuestionario(){
      this.valid=false;
      this.$refs.form.validate();
      if (this.VCambio_salud_anio!= "" & this.VIntensidad_dolor_actividades!= "" & this.VInterferencia_dolor_actividades!= "" &
        this.VLimitacion_actividad_fisica!= "" & this.VLimitacion_trabajo_domesticas!= "" & this.VDificultad_caminar_escaleras!= "" &
        this.VDificultad_agacharse_recoger_objetos!= "" & this.VDificultad_vestirse!= "" & this.VDificultad_comer!= "" &
        this.VDependencia_ayuda_diarias!= "" & this.VIntensidad_dolor!= "" & this.VImpacto_dolor_actividades_habituales!= "" &
        this.VLimitacion_estado_salud!= "" & this.VEstado_salud_ultimos_meses!= "" & this.VLimitacion_estado_salud_ultimo_12_mes!= "" &
        this.VLimitacion_estado_salud_ultimos_5_anios!= "" &
        this.VPercepcion_salud_actual!= "" &
        this.VCambio_salud_ultimo_anio!= "" &
        this.VSentimiento_energia!= "" &
        this.VSentimiento_cansancio!= "" &
        this.VDificultad_actividades_falta_energia!= "" &
        this.VInterferencia_cansancio_actividades!= "" &
        this.VLimitacion_realizar_actividades_sociales!= "" &
        this.VSentimiento_verguenza_situaciones_sociales!= "" &
        this.VLimitacion_trabajo_estudios!= "" &
        this.VDificultad_realizar_tareas!= "" &
        this.VDificultad_cuidar_casa!= "" &
        this.VDificultad_cuidar_otras_personas!= "" &
        this.VDificultad_mantener_estado_animo!= "" &
        this.VSentimiento_nerviosismo_inquietud!= "" &
        this.VDificultad_actividades_sentirse_triste_deprimido!= "" &
        this.VSentimiento_bienestar_emocional!= "" &
        this.VDificultad_concentrarse_mantener_atencion!= "" &
        this.VDificultad_tomar_decisiones!= "" &
        this.VDificultad_dormir!= "" &
        this.Videntificacion!= "" ){

        const postCuestionario = {
          "Cambio_salud_anio": this.VCambio_salud_anio,
          "Intensidad_dolor_actividades": this.VIntensidad_dolor_actividades,
          "Interferencia_dolor_actividades": this.VInterferencia_dolor_actividades,
          "Limitacion_actividad_fisica": this.VLimitacion_actividad_fisica,
          "Limitacion_trabajo_domesticas": this.VLimitacion_trabajo_domesticas,
          "Dificultad_caminar_escaleras": this.VDificultad_caminar_escaleras,
          "Dificultad_agacharse_recoger_objetos": this.VDificultad_agacharse_recoger_objetos,
          "Dificultad_vestirse": this.VDificultad_vestirse,
          "Dificultad_comer": this.VDificultad_comer,
          "Dependencia_ayuda_diarias": this.VDependencia_ayuda_diarias,
          "Intensidad_dolor": this.VIntensidad_dolor,
          "Impacto_dolor_actividades_habituales": this.VImpacto_dolor_actividades_habituales,
          "Limitacion_estado_salud": this.VLimitacion_estado_salud,
          "Estado_salud_ultimos_meses": this.VEstado_salud_ultimos_meses,
          "Limitacion_estado_salud_ultimo_12_mes": this.VLimitacion_estado_salud_ultimo_12_mes,
          "Limitacion_estado_salud_ultimos_5_anios": this.VLimitacion_estado_salud_ultimos_5_anios,
          "Percepcion_salud_actual": this.VPercepcion_salud_actual,
          "Cambio_salud_ultimo_anio": this.VCambio_salud_ultimo_anio,
          "Sentimiento_energia": this.VSentimiento_energia,
          "Sentimiento_cansancio": this.VSentimiento_cansancio,
          "Dificultad_actividades_falta_energia": this.VDificultad_actividades_falta_energia,
          "Interferencia_cansancio_actividades": this.VInterferencia_cansancio_actividades,
          "Limitacion_realizar_actividades_sociales": this.VLimitacion_realizar_actividades_sociales,
          "Sentimiento_verguenza_situaciones_sociales": this.VSentimiento_verguenza_situaciones_sociales,
          "Limitacion_trabajo_estudios": this.VLimitacion_trabajo_estudios,
          "Dificultad_realizar_tareas": this.VDificultad_realizar_tareas,
          "Dificultad_cuidar_casa": this.VDificultad_cuidar_casa,
          "Dificultad_cuidar_otras_personas": this.VDificultad_cuidar_otras_personas,
          "Dificultad_mantener_estado_animo": this.VDificultad_mantener_estado_animo,
          "Sentimiento_nerviosismo_inquietud": this.VSentimiento_nerviosismo_inquietud,
          "Dificultad_actividades_sentirse_triste_deprimido": this.VDificultad_actividades_sentirse_triste_deprimido,
          "Sentimiento_bienestar_emocional": this.VSentimiento_bienestar_emocional,
          "Dificultad_concentrarse_mantener_atencion": this.VDificultad_concentrarse_mantener_atencion,
          "Dificultad_tomar_decisiones": this.VDificultad_tomar_decisiones,
          "Dificultad_dormir": this.VDificultad_dormir,
          "Identificacion": this.Videntificacion, 
        }
        store.commit('AsignacionInformacionCuestionario', postCuestionario );
        store.dispatch('PostInfoCuestionario');
       }else{
        Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Se debe llenar todos los campos',
              allowOutsideClick: false,
              backdrop: false,
              confirmButtonColor: '#ff0000a8'
            });
        
       }
    },
    enviarInfoFinanciero(){
      this.valid=false;
      if (this.VCasaAlquilada=='No'){
        this.VValorArrendamiento = 0
      }
      this.$refs.form.validate();
      if (this.VPersonasAcargo != "" & this.VIngresoMensual != "" & this.VRentas != "" & this.VOtrosIngresos != "" & this.VTotalIngresos != ""
      & this.VPatrimonio != "" & this.VPatrimonioRepresentado != "" & this.VCasaAlquilada != ""  & this.VEgresosMensuales != ""){
        const postFinanciera = {
          "PersonasAcargo": this.VPersonasAcargo,
          "IngresoMensual": this.VIngresoMensual,
          "Rentas": this.VRentas,
          "OtrosIngresos": this.VOtrosIngresos,
          "TotalIngresos": this.VTotalIngresos,
          "Patrimonio": this.VPatrimonio,
          "PatrimonioRepresentado": this.VPatrimonioRepresentado,
          "CasaAlquilada": this.VCasaAlquilada,
          "ValorArrendamiento": this.VValorArrendamiento,
          "EgresosMensuales": this.VEgresosMensuales,
          "CedulaMasonica":localStorage.cedula
        }
        store.commit('AsignacionInformacionFinanciera', postFinanciera );
        store.dispatch('PostInfoFinanciera');
       }else{
        Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Se debe llenar todos los campos',
              allowOutsideClick: false,
              backdrop: false,
              confirmButtonColor: '#ff0000a8'
            });
        
       }
      

    },

    enviarInfoEstadoLogia(){
      this.valid=false;
      if(this.VGradoLogia==null){
        console.log(" ")
      }
      this.$refs.form.validate();
      if ((this.VGradoLogia != "" && this.VGradoLogia != null) && (this.VTallerLogia != "" && this.VTallerLogia != null) ){
        const postEstado = {
          "Taller": this.VTallerLogia,
          "Grado": this.VGradoLogia,
          "CedulaMasonica":localStorage.cedula
        }
        store.commit('AsignacionInformacionEstadoLogia', postEstado );
        store.dispatch('PostInfoEstadoLogia');
       }else{
        Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Se debe llenar todos los campos',
              allowOutsideClick: false,
              backdrop: false,
              confirmButtonColor: '#ff0000a8'
            });
        
       
       }
    },


    enviarInfoSalud(){
      this.valid=false;
      this.$refs.form.validate();
      if (this.VTipoSangre != "" & this.VRh != "" 
      & this.VSeguroVida != "" & this.VSeguroMedico != "" & this.VCualSeguro != ""
      & this.VEps != ""  & this.VEstadoSalud != ""){
        const postSalud = {
          "TipoSangre": this.VTipoSangre,
          "Rh": this.VRh,
          "SeguroVida": this.VSeguroVida,
          "SeguroMedico": this.VSeguroMedico,
          "CualSeguro": this.VCualSeguro,
          "Eps": this.VEps,
          "EstadoSalud": this.VEstadoSalud,
          "CedulaMasonica":localStorage.cedula
        }
        store.commit('AsignacionInformacionSalud', postSalud );
        store.dispatch('PostInfoSalud');
       }else{
        Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Se debe llenar todos los campos',
              allowOutsideClick: false,
              backdrop: false,
              confirmButtonColor: '#ff0000a8'
            });
       }
    },

    enviarInfoGeneral(){
      let ParienteMason=this.VParienteMason
      let NombreParienteMason=this.VNombreParienteMason
      let LogiaPariente=this.VLogiaPariente
      let CiudadLogiaPariente=this.VCiudadLogiaPariente
      let SugeridoMasoneria=this.VSugeridoMasoneria
      let QuienSugerido=this.VQuienSugerido
      let FormuladoSolicitud=this.VFormuladoSolicitud
      let SolicitudDonde=this.VSolicitudDonde
      let SolicitudCuando=this.VSolicitudCuando
      let SolicitudLogia=this.VSolicitudLogia
      let PerteneceSociedadSecreta=this.VPerteneceSociedadSecreta
      let CualPerteneceSociedad=this.VCualPerteneceSociedad

      this.valid=false;                   
      this.$refs.form.validate();
      if ( this.VParienteMason != "" & this.VSugeridoMasoneria != "" & this.VEntiendeMasoneria != "" & this.VOportunidadPertenecer != ""
      & this.VProyectVidaMasoneria != "" & this.VEntiendeSociedadSecreta != "" & this.VPerteneceSociedadSecreta != ""
      & this.VPrincipioCreador != "" & this.VAporteMejorarHumanidad != "" & this.VRazonVida != "" & this.VPorquePrincipioCreador != ""){
          if (this.VParienteMason=="No"){
             ParienteMason=this.VParienteMason
             NombreParienteMason="N/A"
             LogiaPariente="N/A"
             CiudadLogiaPariente="N/A"

          }else{
             ParienteMason=this.VParienteMason
             NombreParienteMason=this.VNombreParienteMason
             LogiaPariente=this.VLogiaPariente
             CiudadLogiaPariente=this.VCiudadLogiaPariente
          }
          if (this.VSugeridoMasoneria=="No"){
             SugeridoMasoneria=this.VSugeridoMasoneria
             QuienSugerido="N/A"

          }else{
             SugeridoMasoneria=this.VSugeridoMasoneria
             QuienSugerido=this.VQuienSugerido
          }
          if (this.VFormuladoSolicitud=="No"){
             FormuladoSolicitud=this.VFormuladoSolicitud
             SolicitudDonde="N/A"
             SolicitudCuando="N/A"
             SolicitudLogia="N/A"

          }else{
             FormuladoSolicitud=this.VFormuladoSolicitud
             SolicitudDonde=this.VSolicitudDonde
             SolicitudCuando=this.VSolicitudCuando
             SolicitudLogia=this.VSolicitudLogia
          }

          if (this.VPerteneceSociedadSecreta=="No"){
             PerteneceSociedadSecreta=this.VPerteneceSociedadSecreta
             CualPerteneceSociedad="N/A"

          }else{
             PerteneceSociedadSecreta=this.VPerteneceSociedadSecreta
             CualPerteneceSociedad=this.VCualPerteneceSociedad
          }
          let VinculoPresentaMason=this.VVinculoPresentaMason
          let EntiendeMasoneria=this.VEntiendeMasoneria
          let OportunidadPertenecer=this.VOportunidadPertenecer
          let ProyectVidaMasoneria=this.VProyectVidaMasoneria
          let EntiendeSociedadSecreta=this.VEntiendeSociedadSecreta
          let PrincipioCreador=this.VPrincipioCreador
          let AporteMejorarHumanidad=this.VAporteMejorarHumanidad
          let RazonVida=this.VRazonVida
          let PorquePrincipioCreador=this.VPorquePrincipioCreador
        const postGeneral = {
          "ParienteMason":ParienteMason,
          "NombreParienteMason":NombreParienteMason,
          "LogiaPariente":LogiaPariente,
          "CiudadLogiaPariente":CiudadLogiaPariente,
          "SugeridoMasoneria":SugeridoMasoneria,
          "QuienSugerido":QuienSugerido,
          "FormuladoSolicitud":FormuladoSolicitud,
          "SolicitudDonde":SolicitudDonde,
          "SolicitudCuando":SolicitudCuando,
          "SolicitudLogia":SolicitudLogia,
          "VinculoPresentaMason":VinculoPresentaMason,
          "EntiendeMasoneria":EntiendeMasoneria,
          "OportunidadPertenecer":OportunidadPertenecer,
          "ProyectVidaMasoneria":ProyectVidaMasoneria,
          "EntiendeSociedadSecreta":EntiendeSociedadSecreta,
          "PerteneceSociedadSecreta":PerteneceSociedadSecreta,
          "CualPerteneceSociedad":CualPerteneceSociedad,
          "PrincipioCreador":PrincipioCreador,
          "AporteMejorarHumanidad":AporteMejorarHumanidad,
          "RazonVida":RazonVida,
          "PorquePrincipioCreador":PorquePrincipioCreador,
          "CedulaMasonica":localStorage.cedula
        }
        store.commit('AsignacionInformacionGeneral', postGeneral );
        store.dispatch('PostInfoGeneral');
       }else{
        Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Se debe llenar todos los campos',
              allowOutsideClick: false,
              backdrop: false,
              confirmButtonColor: '#ff0000a8'
            });
       }
    },



    validate() {
              this.$refs.form.validate()
            },
            reset () {
              store.commit('CambiarMuestraForm', { show: 0 });
              this.$refs.form.reset()              
            },
            Limpiar () {
              this.$refs.form.reset()              
            },            
            resetValidation () {
              this.$refs.form.resetValidation()
            },
            ValidarFormulario(){
              if (this.$refs.form.validate())
              {
                let mes1 = ""
                let mes2 = ""

                switch (this.VMesInicial) {
                case "Enero":
                  mes1 = "01"
                break;
                case "Febrero":
                  mes1 = "02"
                break;
                case "Marzo":
                  mes1 = "03"
                break;
                case "Abril":
                  mes1 = "04"
                break;
                case "Mayo":
                  mes1 = "05"
                break;
                case "Junio":
                  mes1 = "06"
                break;
                case "Julio":
                  mes1 = "07"
                break;
                case "Agosto":
                  mes1 = "08"
                break;
                case "Septiembre":
                  mes1 = "09"
                break;
                case "Octubre":
                  mes1 = "10"
                break;
                case "Noviembre":
                  mes1 = "11"
                break;
                case "Diciembre":
                  mes1 = "12"
                break;                                                                                                                
                }
   
                switch (this.VMesFinal) {
                case "Enero":
                  mes2 = "01"
                break;
                case "Febrero":
                  mes2 = "02"
                break;
                case "Marzo":
                  mes2 = "03"
                break;
                case "Abril":
                  mes2 = "04"
                break;
                case "Mayo":
                  mes2 = "05"
                break;
                case "Junio":
                  mes2 = "06"
                break;
                case "Julio":
                  mes2 = "07"
                break;
                case "Agosto":
                  mes2 = "08"
                break;
                case "Septiembre":
                  mes2 = "09"
                break;
                case "Octubre":
                  mes2 = "10"
                break;
                case "Noviembre":
                  mes2 = "11"
                break;
                case "Diciembre":
                  mes2 = "12"
                break;                                                                                                                
                }   

                let fecha1 = Date.parse(this.VAñoInicial +"-"+ mes1 +"-"+ "01")
                let fecha2 = Date.parse(this.VAñoFinal +"-"+ mes2 +"-"+ "30")


                if(fecha1 <= fecha2){                
                  let FiltroNivel = "";
                  FiltroNivel = this.nestudios.filter(number => number.value == this.VEstudio );

                  if (store.state.IndexFormacion !== ''){                  
                      store.state.FormacionAcademica.splice(store.state.IndexFormacion, 1);
                    }
                  // store.commit('AsignarValoresAcademicos', { Centro: this.VEducativo, Nivel:FiltroNivel[0].text, PeriodoInicial:this.VAñoInicial, MesI:this.VMesInicial ,PeriodoFinal:this.VAñoFinal ,MesF:this.VMesFinal, EstadoEdu:this.VEeducacion });
                  this.reset();
                  this.e1 = this.e1 + 1;

                }else{
                  this.alertdeañoinicial = 1
                }
              }
              else{
                this.$refs.form.validate()
              }
            }, 
            Atras(){
              this.e1 = this.e1 - 1
            },
       },
  } 
</script>
<style scoped>
.imagenGJX {
  width: 4%;
}

.piedepagina {
  color: #1e1e1e !important;
  caret-color: #fff !important;
}

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

.letraTitle {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #0E264A;
}

.theme--light.v-btn.v-btn--has-bg {
  background-color: #007ef9;
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

#taula {
  height: 200px !important;
  overflow: auto;
  width: 800px;
  margin: 0 auto;
}

b,
strong {
  font-weight: NORMAL;
  font-size: 10px;
}

.theme--dark.v-card {
  background-color: #eee;
}

.v-application .teal {
  background-color: #81818173 !important;
  border-color: #81818173 !important;
}

.v-application .primary {
  background-color: #007ef9 !important;
  border-color: #007ef9 !important;
}

.subheading {
  color: #007ef9
}

@media (min-width: 300px) and (max-width: 700px) {
  .container {
    width: 140%;
    padding: 4px;
    margin-right: -29px;
    margin-left: -60px;
  }

  #newInfo {
    width: 100%;
    padding: 4px;
    margin-right: 0px;
    margin-left: 0px;
  }

  .textarea {
    overflow: hidden;
    display: block;
    height: auto;
  }




}
</style>