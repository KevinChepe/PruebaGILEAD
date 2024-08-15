import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import auth from "@/auth";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

Vue.use(Vuex)
const ENDPOINT_PATH = "http://localhost:1337/";
const today = new Date();

// Obtener partes individuales de la fecha
const day = today.getDate();
const month = today.getMonth() + 1; // Los meses en JavaScript son 0-11
const year = today.getFullYear();

// Formatear la fecha como dd/mm/yyyy
const formattedDate = `${month}/${day}/${year}`;

export default new Vuex.Store({
  state: {
    DatosClasificacionTipo: [],
    infoPersonal: [],
    infoCuestionario: [],
    infoEstadoLogia: [],
    infoPostulantre: [],
    infoPostulantreAd: [],
    infoPostulantreToken: [],
    infoMiembroToken: [],
    infoFinanciera: [],
    infoSalud: [],
    infoGeneral: [],
    infoAcademica: [],
    infoProfesional: [],
    infoUserToken: [],
    infoIdioma: [],
    infoVivienda: [],
    user: [],
  },
  getters: {
  },
  mutations: {
    AsignacionUser(state, payload) {
      state.user.push({
        email: payload.email,
        tipousuario: payload.tipousuario,
        token: payload.token,
        username: payload.username
      })
    },
    AsignacionInformacionPersonal(state, payload) {
      state.infoPersonal.splice(0, state.infoPersonal.length);
      state.infoPersonal.push({
        Primer_nombre: payload.Primer_nombre,
        Segundo_nombre: payload.Segundo_nombre,
        Primer_apellido: payload.Primer_apellido,
        Segundo_apellido: payload.Segundo_apellido,
        Pais: payload.Pais,
        TipoDocumeto: payload.TipoDocumeto,
        Identificacion: payload.Identificacion,
        Email: payload.Email,
        TelefonoPrefijo: payload.TelefonoPrefijo,
        PhoneWhatsapp: payload.PhoneWhatsapp,
        Edad: payload.Edad,
        Sexo: payload.Sexo,
        Genero: payload.Genero,
        Estado_civil: payload.Estado_civil,
        Nivel_educativo: payload.Nivel_educativo,
        Ocupacion: payload.Ocupacion,
        Religion: payload.Religion,
        Estrato_socioeconomico: payload.Estrato_socioeconomico,
        Ocupacion_actual: payload.Ocupacion_actual,
        Raza_etnia: payload.Raza_etnia,
        Tiempo_diagnostico: payload.Tiempo_diagnostico,
        Tratamiento_antirretroviral: payload.Tratamiento_antirretroviral,
        codeDocumentoFirma: payload.codeDocumentoFirma,
      })
    },
    AsignacionInformacionCuestionario(state, payload) {
      state.infoCuestionario.splice(0, state.infoCuestionario.length);
      state.infoCuestionario.push({
        Cambio_salud_anio: payload.Cambio_salud_anio,
        Intensidad_dolor_actividades: payload.Intensidad_dolor_actividades,
        Interferencia_dolor_actividades: payload.Interferencia_dolor_actividades,
        Limitacion_actividad_fisica: payload.Limitacion_actividad_fisica,
        Limitacion_trabajo_domesticas: payload.Limitacion_trabajo_domesticas,
        Dificultad_caminar_escaleras: payload.Dificultad_caminar_escaleras,
        Dificultad_agacharse_recoger_objetos: payload.Dificultad_agacharse_recoger_objetos,
        Dificultad_vestirse: payload.Dificultad_vestirse,
        Dificultad_comer: payload.Dificultad_comer,
        Dependencia_ayuda_diarias: payload.Dependencia_ayuda_diarias,
        Intensidad_dolor: payload.Intensidad_dolor,
        Impacto_dolor_actividades_habituales: payload.Impacto_dolor_actividades_habituales,
        Limitacion_estado_salud: payload.Limitacion_estado_salud,
        Estado_salud_ultimos_meses: payload.Estado_salud_ultimos_meses,
        Limitacion_estado_salud_ultimo_12_mes: payload.Limitacion_estado_salud_ultimo_12_mes,
        Limitacion_estado_salud_ultimos_5_anios: payload.Limitacion_estado_salud_ultimos_5_anios,
        Percepcion_salud_actual: payload.Percepcion_salud_actual,
        Cambio_salud_ultimo_anio: payload.Cambio_salud_ultimo_anio,
        Sentimiento_energia: payload.Sentimiento_energia,
        Sentimiento_cansancio: payload.Sentimiento_cansancio,
        Dificultad_actividades_falta_energia: payload.Dificultad_actividades_falta_energia,
        Interferencia_cansancio_actividades: payload.Interferencia_cansancio_actividades,
        Limitacion_realizar_actividades_sociales: payload.Limitacion_realizar_actividades_sociales,
        Sentimiento_verguenza_situaciones_sociales: payload.Sentimiento_verguenza_situaciones_sociales,
        Limitacion_trabajo_estudios: payload.Limitacion_trabajo_estudios,
        Dificultad_realizar_tareas: payload.Dificultad_realizar_tareas,
        Dificultad_cuidar_casa: payload.Dificultad_cuidar_casa,
        Dificultad_cuidar_otras_personas: payload.Dificultad_cuidar_otras_personas,
        Dificultad_mantener_estado_animo: payload.Dificultad_mantener_estado_animo,
        Sentimiento_nerviosismo_inquietud: payload.Sentimiento_nerviosismo_inquietud,
        Dificultad_actividades_sentirse_triste_deprimido: payload.Dificultad_actividades_sentirse_triste_deprimido,
        Sentimiento_bienestar_emocional: payload.Sentimiento_bienestar_emocional,
        Dificultad_concentrarse_mantener_atencion: payload.Dificultad_concentrarse_mantener_atencion,
        Dificultad_tomar_decisiones: payload.Dificultad_tomar_decisiones,
        Dificultad_dormir: payload.Dificultad_dormir,
        Identificacion: payload.Identificacion,
      })
    },

    AsignacionInformacionEstadoLogia(state, payload) {
      state.infoEstadoLogia.splice(0, state.infoEstadoLogia.length);
      state.infoEstadoLogia.push({
        Taller: payload.Taller,
        Grado: payload.Grado,
        CedulaMasonica: payload.CedulaMasonica
      })
    },
    AsignacionInformacionPostulante(state, payload) {
      state.infoPostulantre.splice(0, state.infoPostulantre.length);
      state.infoPostulantre.push({
        Email: payload.Email,
        NombreApellido: payload.NombreApellido,
        SerParte: payload.SerParte,
        Edad: payload.Edad,
        CiudadResidencia: payload.CiudadResidencia,
        DireccionResidencia: payload.DireccionResidencia,
        Profesion: payload.Profesion,
        UltimoEmpleo: payload.UltimoEmpleo,
        EstadoCivil: payload.EstadoCivil,
        Celular: payload.Celular,
        EnlaceRedSocial: payload.EnlaceRedSocial,
        Referido: payload.Referido,
        NombreTallerRefiere: payload.NombreTallerRefiere,
        CodigoTaller: payload.CodigoTaller,
        ComoSeEntero: payload.ComoSeEntero,
        AceptacionPoliticaDatos: payload.AceptacionPoliticaDatos
      })
    },
    AsignacionInformacionPostulanteAd(state, payload) {

      state.infoPostulantreAd.push({
        id: payload.id,
        Email: payload.Email,
        NombreApellido: payload.NombreApellido,
        SerParte: payload.SerParte
      })
    },

    AsignacionInformacionPostulanteToken(state, payload) {
      state.infoPostulantreToken.splice(0, state.infoPostulantreToken.length);
      state.infoPostulantreToken.push({
        id: payload.id,
        username: payload.username,
        email: payload.email,
        password: payload.password,
        confirmed: payload.confirmed,
        TokenConfirmacion: payload.TokenConfirmacion,
        Roles: payload.Roles
      })
    },
    AsignacionInformacionMiembroToken(state, payload) {
      state.infoMiembroToken.splice(0, state.infoMiembroToken.length);
      state.infoMiembroToken.push({
        id: payload.id,
        username: payload.username,
        email: payload.email,
        password: payload.password,
        confirmed: payload.confirmed,
        TokenConfirmacion: payload.TokenConfirmacion,
        Roles: payload.Roles
      })
    },
    AsignacionInformacionFinanciera(state, payload) {
      state.infoFinanciera.splice(0, state.infoFinanciera.length);
      state.infoFinanciera.push({
        PersonasAcargo: payload.PersonasAcargo,
        IngresoMensual: payload.IngresoMensual,
        Rentas: payload.Rentas,
        OtrosIngresos: payload.OtrosIngresos,
        TotalIngresos: payload.TotalIngresos,
        Patrimonio: payload.Patrimonio,
        PatrimonioRepresentado: payload.PatrimonioRepresentado,
        CasaAlquilada: payload.CasaAlquilada,
        ValorArrendamiento: payload.ValorArrendamiento,
        EgresosMensuales: payload.EgresosMensuales,
        CedulaMasonica: localStorage.cedula
      })
    },

    AsignacionInformacionSalud(state, payload) {
      state.infoSalud.splice(0, state.infoSalud.length);
      state.infoSalud.push({
        TipoSangre: payload.TipoSangre,
        Rh: payload.Rh,
        SeguroVida: payload.SeguroVida,
        SeguroMedico: payload.SeguroMedico,
        CualSeguro: payload.CualSeguro,
        Eps: payload.Eps,
        EstadoSalud: payload.EstadoSalud,
        CedulaMasonica: localStorage.cedula
      })
    },
    AsignacionInformacionGeneral(state, payload) {
      state.infoGeneral.splice(0, state.infoGeneral.length);
      state.infoGeneral.push({
        ParienteMason: payload.ParienteMason,
        NombreParienteMason: payload.NombreParienteMason,
        LogiaPariente: payload.LogiaPariente,
        CiudadLogiaPariente: payload.CiudadLogiaPariente,
        SugeridoMasoneria: payload.SugeridoMasoneria,
        QuienSugerido: payload.QuienSugerido,
        FormuladoSolicitud: payload.FormuladoSolicitud,
        SolicitudDonde: payload.SolicitudDonde,
        SolicitudCuando: payload.SolicitudCuando,
        SolicitudLogia: payload.SolicitudLogia,
        VinculoPresentaMason: payload.VinculoPresentaMason,
        EntiendeMasoneria: payload.EntiendeMasoneria,
        OportunidadPertenecer: payload.OportunidadPertenecer,
        ProyectVidaMasoneria: payload.ProyectVidaMasoneria,
        EntiendeSociedadSecreta: payload.EntiendeSociedadSecreta,
        PerteneceSociedadSecreta: payload.PerteneceSociedadSecreta,
        CualPerteneceSociedad: payload.CualPerteneceSociedad,
        PrincipioCreador: payload.PrincipioCreador,
        RazonVida: payload.RazonVida,
        AporteMejorarHumanidad: payload.AporteMejorarHumanidad,
        PorquePrincipioCreador: payload.PorquePrincipioCreador,
        CedulaMasonica: localStorage.cedula
      })
    },


    AsignacionInformacionAcademica(state, payload) {
      state.infoAcademica.push({
        ModalidadAcademica: payload.ModalidadAcademica,
        SemestresAprobados: payload.SemestresAprobados,
        TituloObtenido: payload.TituloObtenido,
        UniversidadOtorga: payload.UniversidadOtorga,
        EstadoEducativo: payload.EstadoEducativo,
        FechaFinal: payload.FechaFinal,
        CedulaMasonica: localStorage.cedula
      })
    },
    AsignarClasificacionTipo(state, payload) {
      state.DatosClasificacionTipo.push({
        question: payload.question,
        IdPregunta: payload.IdPregunta,
      })
    },
    AsignacionInformacionProfesional(state, payload) {
      state.infoProfesional.push({
        Empresa: payload.Empresa,
        CargoDesempeniado: payload.CargoDesempeniado,
        AniosTrabajados: payload.AniosTrabajados,
        CedulaMasonica: payload.CedulaMasonica,
        PaisEmpresa: payload.PaisEmpresa,
        CiudadEmpresa: payload.CiudadEmpresa,
        EmailEmpresa: payload.EmailEmpresa,
        TelefonoEmpresa: payload.TelefonoEmpresa,
        TelefonoCelEmpresa: payload.TelefonoCelEmpresa
      })
    },
    AsignacionInformacionIdioma(state, payload) {
      state.infoIdioma.push({
        Idioma: payload.Idioma,
        Nivel: payload.Nivel,
        CedulaMasonica: payload.CedulaMasonica
      })
    },
    AsignacionInformacionVivienda(state, payload) {
      state.infoVivienda.push({
        Direccion: payload.Direccion,
        Ciudad: payload.Ciudad,
        Anios: payload.Anios,
        CedulaMasonica: payload.CedulaMasonica,
        Barrio: payload.Barrio
      })
    },
    UpdateAsignacionInformacionProfesional(state, payload) {
      state.infoProfesional.splice(0, state.infoProfesional.length);
      for (let index = 0; index < payload.length; index++) {
        state.infoProfesional.push({
          Empresa: payload[index].Empresa,
          CargoDesempeniado: payload[index].CargoDesempeniado,
          AniosTrabajados: payload[index].AniosTrabajados,
          CedulaMasonica: payload[index].CedulaMasonica,
          PaisEmpresa: payload[index].PaisEmpresa,
          CiudadEmpresa: payload[index].CiudadEmpresa,
          EmailEmpresa: payload[index].EmailEmpresa,
          TelefonoEmpresa: payload[index].TelefonoEmpresa,
          TelefonoCelEmpresa: payload[index].TelefonoCelEmpresa
        })
      }
    },

    UpdateUserToken(state, payload) {
      state.infoUserToken.splice(0, state.infoUserToken.length);
      state.infoUserToken.push({
        id: payload.id,
        password: payload.password,
        Token: payload.Token
      })

    },

    UpdateAsignacionInformacionIdioma(state, payload) {
      state.infoIdioma.splice(0, state.infoIdioma.length);
      for (let index = 0; index < payload.length; index++) {
        state.infoIdioma.push({
          Idioma: payload[index].Idioma,
          Nivel: payload[index].Nivel,
          CedulaMasonica: payload[index].CedulaMasonica
        })
      }
    },
    UpdateAsignacionInformacionVivienda(state, payload) {
      state.infoVivienda.splice(0, state.infoVivienda.length);
      for (let index = 0; index < payload.length; index++) {
        state.infoVivienda.push({
          Direccion: payload[index].Direccion,
          Ciudad: payload[index].Ciudad,
          Anios: payload[index].Anios,
          CedulaMasonica: payload[index].CedulaMasonica,
          Barrio: payload[index].Barrio
        })
      }
    },
    UpdateAsignacionInformacionAcademica(state, payload) {
      state.infoAcademica.splice(0, state.infoAcademica.length);
      for (let index = 0; index < payload.length; index++) {
        state.infoAcademica.push({
          ModalidadAcademica: payload[index].ModalidadAcademica,
          SemestresAprobados: payload[index].SemestresAprobados,
          TituloObtenido: payload[index].TituloObtenido,
          UniversidadOtorga: payload[index].UniversidadOtorga,
          EstadoEducativo: payload[index].EstadoEducativo,
          FechaFinal: payload[index].FechaFinal,
          CedulaMasonica: payload[index].CedulaMasonica
        })
      }
    },
  },
  actions: {
    PostInfoHabeasData: async function ({ commit, state }) {
      try {
        const prk = "prk_JSBkX1S1MBpoELYEZEUZB2rpKy2XSRT4";
        const post = {
          "document": "665f28bf8ebd216cbab45699",
          "sign": true,
          "email": "lsalazar@gjx.ai",
          "name": "Contrato de prueba API1",
          "data": [
            { "key": "name_paciente", "value": state.infoPersonal[0].Primer_nombre + " " + state.infoPersonal[0].Segundo_nombre + " " + state.infoPersonal[0].Primer_apellido + " " + state.infoPersonal[0].Segundo_apellido },
            { "key": "document_type_paciente", "value": state.infoPersonal[0].TipoDocumeto },
            { "key": "cedula_paciente", "value": state.infoPersonal[0].Identificacion },
            { "key": "cedulae_paciente", "value": state.infoPersonal[0].Identificacion },
            { "key": "email_paciente", "value": state.infoPersonal[0].Email },
            { "key": "phone_celular", "value": state.infoPersonal[0].TelefonoPrefijo + state.infoPersonal[0].PhoneWhatsapp },
            { "key": "nationality_paciente", "value": state.infoPersonal[0].Pais },
            { "key": "phone_paciente", "value": state.infoPersonal[0].TelefonoPrefijo + state.infoPersonal[0].PhoneWhatsapp },
            { "key": "date_fecha", "value": formattedDate }
          ],
          "camera": true, //opcional, por defecto false
          "otpCode": true, //opcional, por defecto false
          "options": {
            "whatsapp": true,
            "otpCode": "phone"
          }
        }
        console.log(post)
        axios.post("https://dev.auco.ai/v1/ext/document/save", post, {
          headers: { Authorization: prk }
        }).then(resp => {
          console.log(resp)
          console.log(resp.data.document)
          commit('AsignacionInformacionPersonal', {
            codeDocumentoFirma: resp.data.document
          })

          store.dispatch('GetInfoPersonal').then(
            Swal.fire({
              icon: 'success',
              title: 'Enviado Correctamente',
              text: 'Se registro la informaión con exito',
              confirmButtonColor: 'green'
            }))
        })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error en el registro',
              allowOutsideClick: false,
              backdrop: false,
              confirmButtonColor: '#ff0000a8'
            });
          });
      }
      catch (error) {
        console.log("Error to get info from table informacionPeronal", error, {
          headers: { Authorization: Key }
        });

      }

    },


    PostInfoProfesional: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-profesionals?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });
        if (response.data.data) {
          for (let index = 0; index < response.data.data.length; index++) {
            axios.delete("http://granlogiadecolombia.net:1337/api/tbl-informacion-profesionals/" + response.data.data[index].id, {
              headers: { Authorization: Key }
            })
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
          }
          for (let index = 0; index < state.infoProfesional.length; index++) {
            const postProfesional = {
              data: {
                'Empresa': state.infoProfesional[index].Empresa,
                'CargoDesempeniado': state.infoProfesional[index].CargoDesempeniado,
                'AniosTrabajados': state.infoProfesional[index].AniosTrabajados,
                'CedulaMasonica': state.infoProfesional[index].CedulaMasonica,
                'PaisEmpresa': state.infoProfesional[index].PaisEmpresa,
                'CiudadEmpresa': state.infoProfesional[index].CiudadEmpresa,
                'EmailEmpresa': state.infoProfesional[index].EmailEmpresa,
                'TelefonoEmpresa': state.infoProfesional[index].TelefonoEmpresa,
                'TelefonoCelEmpresa': state.infoProfesional[index].TelefonoCelEmpresa
              }
            }
            axios.post("http://granlogiadecolombia.net:1337/api/tbl-informacion-profesionals/", postProfesional, {
              headers: { Authorization: Key }
            })
              .then(resp => {
              })
              .catch(error => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Error',
                  allowOutsideClick: false,
                  backdrop: false,
                  confirmButtonColor: '#ff0000a8'
                });
              });
          }
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      }
      catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
      }
    },
    PostInfoIdioma: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-idiomas?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });
        if (response.data.data) {
          for (let index = 0; index < response.data.data.length; index++) {
            axios.delete("http://granlogiadecolombia.net:1337/api/tbl-informacion-idiomas/" + response.data.data[index].id, {
              headers: { Authorization: Key }
            })
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
          }
          for (let index = 0; index < state.infoIdioma.length; index++) {
            const postIdioma = {
              data: {
                'Idioma': state.infoIdioma[index].Idioma,
                'Nivel': state.infoIdioma[index].Nivel,
                'CedulaMasonica': state.infoIdioma[index].CedulaMasonica
              }
            }
            axios.post("http://granlogiadecolombia.net:1337/api/tbl-informacion-idiomas/", postIdioma, {
              headers: { Authorization: Key }
            })
              .then(resp => {
              })
              .catch(error => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Error',
                  allowOutsideClick: false,
                  backdrop: false,
                  confirmButtonColor: '#ff0000a8'
                });
              });
          }
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      }
      catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
      }
    },

    PostInfoPostulanteToken: async function ({ commit, state }) {
      try {
        const user = {
          "id": state.infoPostulantreToken[0].id,
          "username": state.infoPostulantreToken[0].username,
          "email": state.infoPostulantreToken[0].email,
          "password": state.infoPostulantreToken[0].password,
          "confirmed": state.infoPostulantreToken[0].confirmed,
          "TokenConfirmacion": state.infoPostulantreToken[0].TokenConfirmacion,
          "Roles": state.infoPostulantreToken[0].Roles
        }
        await axios.put("http://granlogiadecolombia.net:1337/api/users/" + state.infoPostulantreToken[0].id, user, {
          // headers: { 'Content-Type': 'application/json',Authorization: Key}

          headers: { Authorization: Key }

        })
          .then(resp => {
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se logro ingresar, revise adecuadamente los datos',
              allowOutsideClick: false,
              backdrop: false,
              confirmButtonColor: '#ff0000a8'
            });
          });
      } catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
      }

    },

    PutInfoUsers: async function ({ commit, state }) {
      try {
        const user = {
          "id": state.infoUserToken[0].id,
          "password": state.infoUserToken[0].password,
          "Token": state.infoUserToken[0].Token,

        }
        await axios.put("http://granlogiadecolombia.net:1337/api/users/" + state.infoUserToken[0].id, user, {
          headers: { 'Content-Type': 'application/json' }
          // headers: { Authorization: Key }
        })
          .then(resp => {
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se logro ingresar, revise adecuadamente los datos',
              allowOutsideClick: false,
              backdrop: false,
              confirmButtonColor: '#ff0000a8'
            });
          });
      } catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
      }



    },
    PostInfoMiembroToken: async function ({ commit, state }) {
      try {
        const user = {
          "id": state.infoMiembroToken[0].id,
          "username": state.infoMiembroToken[0].username,
          "email": state.infoMiembroToken[0].email,
          "password": state.infoMiembroToken[0].password,
          "confirmed": state.infoMiembroToken[0].confirmed,
          "TokenConfirmacion": state.infoMiembroToken[0].TokenConfirmacion,
          "Roles": state.infoMiembroToken[0].Roles
        }
        await axios.put("http://granlogiadecolombia.net:1337/api/users/" + state.infoMiembroToken[0].id, user, {
          // headers: { 'Content-Type': 'application/json'}
          headers: { Authorization: Key }
        })
          .then(resp => {
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se logro ingresar, revise adecuadamente los datos',
              allowOutsideClick: false,
              backdrop: false,
              confirmButtonColor: '#ff0000a8'
            });
          });
      } catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
      }

    },

    PostInfoVivienda: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-viviendas?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });
        if (response.data.data) {
          for (let index = 0; index < response.data.data.length; index++) {
            axios.delete("http://granlogiadecolombia.net:1337/api/tbl-informacion-viviendas/" + response.data.data[index].id, {
              headers: { Authorization: Key }
            })
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
          }
          for (let index = 0; index < state.infoVivienda.length; index++) {
            const postVivienda = {
              data: {
                'Direccion': state.infoVivienda[index].Direccion,
                'Ciudad': state.infoVivienda[index].Ciudad,
                'Anios': state.infoVivienda[index].Anios,
                'CedulaMasonica': state.infoVivienda[index].CedulaMasonica,
                'Barrio': state.infoVivienda[index].Barrio
              }
            }
            axios.post("http://granlogiadecolombia.net:1337/api/tbl-informacion-viviendas/", postVivienda, {
              headers: { Authorization: Key }
            })
              .then(resp => {
              })
              .catch(error => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Error',
                  allowOutsideClick: false,
                  backdrop: false,
                  confirmButtonColor: '#ff0000a8'
                });
              });
          }
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      }
      catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
      }
    },

    PostInfoCuestionario: async function ({ commit, state }) {
      console.log(state.infoCuestionario)
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        const post = {
          data: {
            "Cambio_salud_anio": state.infoCuestionario[0].Cambio_salud_anio,
            "Intensidad_dolor_actividades": state.infoCuestionario[0].Intensidad_dolor_actividades,
            "Interferencia_dolor_actividades": state.infoCuestionario[0].Interferencia_dolor_actividades,
            "Limitacion_actividad_fisica": state.infoCuestionario[0].Limitacion_actividad_fisica,
            "Limitacion_trabajo_domesticas": state.infoCuestionario[0].Limitacion_trabajo_domesticas,
            "Dificultad_caminar_escaleras": state.infoCuestionario[0].Dificultad_caminar_escaleras,
            "Dificultad_agacharse_recoger_objetos": state.infoCuestionario[0].Dificultad_agacharse_recoger_objetos,
            "Dificultad_vestirse": state.infoCuestionario[0].Dificultad_vestirse,
            "Dificultad_comer": state.infoCuestionario[0].Dificultad_comer,
            "Dependencia_ayuda_diarias": state.infoCuestionario[0].Dependencia_ayuda_diarias,
            "Intensidad_dolor": state.infoCuestionario[0].Intensidad_dolor,
            "Impacto_dolor_actividades_habituales": state.infoCuestionario[0].Impacto_dolor_actividades_habituales,
            "Limitacion_estado_salud": state.infoCuestionario[0].Limitacion_estado_salud,
            "Estado_salud_ultimos_meses": state.infoCuestionario[0].Estado_salud_ultimos_meses,
            "Limitacion_estado_salud_ultimo_12_mes": state.infoCuestionario[0].Limitacion_estado_salud_ultimo_12_mes,
            "Limitacion_estado_salud_ultimos_5_anios": state.infoCuestionario[0].Limitacion_estado_salud_ultimos_5_anios,
            "Percepcion_salud_actual": state.infoCuestionario[0].Percepcion_salud_actual,
            "Cambio_salud_ultimo_anio": state.infoCuestionario[0].Cambio_salud_ultimo_anio,
            "Sentimiento_energia": state.infoCuestionario[0].Sentimiento_energia,
            "Sentimiento_cansancio": state.infoCuestionario[0].Sentimiento_cansancio,
            "Dificultad_actividades_falta_energia": state.infoCuestionario[0].Dificultad_actividades_falta_energia,
            "Interferencia_cansancio_actividades": state.infoCuestionario[0].Interferencia_cansancio_actividades,
            "Limitacion_realizar_actividades_sociales": state.infoCuestionario[0].Limitacion_realizar_actividades_sociales,
            "Sentimiento_verguenza_situaciones_sociales": state.infoCuestionario[0].Sentimiento_verguenza_situaciones_sociales,
            "Limitacion_trabajo_estudios": state.infoCuestionario[0].Limitacion_trabajo_estudios,
            "Dificultad_realizar_tareas": state.infoCuestionario[0].Dificultad_realizar_tareas,
            "Dificultad_cuidar_casa": state.infoCuestionario[0].Dificultad_cuidar_casa,
            "Dificultad_cuidar_otras_personas": state.infoCuestionario[0].Dificultad_cuidar_otras_personas,
            "Dificultad_mantener_estado_animo": state.infoCuestionario[0].Dificultad_mantener_estado_animo,
            "Sentimiento_nerviosismo_inquietud": state.infoCuestionario[0].Sentimiento_nerviosismo_inquietud,
            "Dificultad_actividades_sentirse_triste_deprimido": state.infoCuestionario[0].Dificultad_actividades_sentirse_triste_deprimido,
            "Sentimiento_bienestar_emocional": state.infoCuestionario[0].Sentimiento_bienestar_emocional,
            "Dificultad_concentrarse_mantener_atencion": state.infoCuestionario[0].Dificultad_concentrarse_mantener_atencion,
            "Dificultad_tomar_decisiones": state.infoCuestionario[0].Dificultad_tomar_decisiones,
            "Dificultad_dormir": state.infoCuestionario[0].Dificultad_dormir,
            "Identificacion": state.infoCuestionario[0].Identificacion,
          }
        }
        console.log(post)
        axios.post("http://localhost:1337/api/info-encuestas", post, {
          headers: { Authorization: Key }
        })
          .then(resp => {
            Swal.fire({
              icon: 'success',
              title: 'Guardado Correctamente',
              text: 'Se registro la informaión con exito',
              confirmButtonColor: 'green'
            });
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error en el registro',
              allowOutsideClick: false,
              backdrop: false,
              confirmButtonColor: '#ff0000a8'
            });
          });

      }
      catch (error) {
        console.log("Error to get info from table informacionPeronal", error, {
          headers: { Authorization: Key }
        });

      }
    },

    PostInfoEstadoLogia: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-estado-en-logias?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });
        if (response.data.data[0]) {
          const postEstdoLogia = {
            data: {
              "Taller": state.infoEstadoLogia[0].Taller,
              "Grado": state.infoEstadoLogia[0].Grado,
              "CedulaMasonica": state.infoEstadoLogia[0].CedulaMasonica
            }
          }
          axios.put("http://granlogiadecolombia.net:1337/api/tbl-informacion-estado-en-logias/" + response.data.data[0].id, postEstdoLogia, {
            headers: { Authorization: Key }
          })
            .then(resp => {
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario ya se encuentra registrado',
                allowOutsideClick: false,
                backdrop: false,
                confirmButtonColor: '#ff0000a8'
              });
            });
        }
        else {
          console.log("Error al extraer informacion del API aqui entro por respuesta del get info");
          const postEstdoLogia = {
            data: {
              "Taller": state.infoEstadoLogia[0].Taller,
              "Grado": state.infoEstadoLogia[0].Grado,
              "CedulaMasonica": state.infoEstadoLogia[0].CedulaMasonica
            }
          }
          axios.post("http://granlogiadecolombia.net:1337/api/tbl-informacion-estado-en-logias", postEstdoLogia, {
            headers: { Authorization: Key }
          })
            .then(resp => {
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario ya se encuentra registrado',
                allowOutsideClick: false,
                backdrop: false,
                confirmButtonColor: '#ff0000a8'
              });
            });
        }
      }
      catch (error) {
        console.log("Error to get info from table informacionEstadoLogia", error);
      }
    },
    PostInfoPostulante: async function ({ commit, state }) {
      const postPostulante = {
        data: {
          "Email": state.infoPostulantre[0].Email,
          "NombreApellido": state.infoPostulantre[0].NombreApellido,
          "SerParte": state.infoPostulantre[0].SerParte,
          "Edad": state.infoPostulantre[0].Edad,
          "CiudadResidencia": state.infoPostulantre[0].CiudadResidencia,
          "DireccionResidencia": state.infoPostulantre[0].DireccionResidencia,
          "Profesion": state.infoPostulantre[0].Profesion,
          "UltimoEmpleo": state.infoPostulantre[0].UltimoEmpleo,
          "EstadoCivil": state.infoPostulantre[0].EstadoCivil,
          "Celular": state.infoPostulantre[0].Celular,
          "EnlaceRedSocial": state.infoPostulantre[0].EnlaceRedSocial,
          "Referido": state.infoPostulantre[0].Referido,
          "NombreTallerRefiere": state.infoPostulantre[0].NombreTallerRefiere,
          "CodigoTaller": state.infoPostulantre[0].CodigoTaller,
          "ComoSeEntero": state.infoPostulantre[0].ComoSeEntero,
          "AceptacionPoliticaDatos": state.infoPostulantre[0].AceptacionPoliticaDatos
        }
      }
      axios.post("http://granlogiadecolombia.net:1337/api/tbl-postulantes", postPostulante, {
        headers: { 'Content-Type': 'application/json' }

        // headers: { Authorization: Key }

      })
        .then(resp => {
          Swal.fire({
            icon: 'success',
            title: 'Enviado correctamente',
            text: 'Recibira información dentro de poco',
            confirmButtonColor: 'green'
          });
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Informacion no pudo ser registrada',
            allowOutsideClick: false,
            backdrop: false,
            confirmButtonColor: '#ff0000a8'
          });
        });

    },
    PostInfoFinanciera: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-financieras?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });
        if (response.data.data[0]) {
          const postfinanciera = {
            data: {
              "PersonasAcargo": state.infoFinanciera[0].PersonasAcargo,
              "IngresoMensual": state.infoFinanciera[0].IngresoMensual,
              "Rentas": state.infoFinanciera[0].Rentas,
              "OtrosIngresos": state.infoFinanciera[0].OtrosIngresos,
              "TotalIngresos": state.infoFinanciera[0].TotalIngresos,
              "Patrimonio": state.infoFinanciera[0].Patrimonio,
              "PatrimonioRepresentado": state.infoFinanciera[0].PatrimonioRepresentado,
              "CasaAlquilada": state.infoFinanciera[0].CasaAlquilada,
              "ValorArrendamiento": state.infoFinanciera[0].ValorArrendamiento,
              "EgresosMensuales": state.infoFinanciera[0].EgresosMensuales,
              "CedulaMasonica": localStorage.cedula

            }
          }
          axios.put("http://granlogiadecolombia.net:1337/api/tbl-informacion-financieras/" + response.data.data[0].id, postfinanciera, {
            headers: { Authorization: Key }
          })
            .then(resp => {
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario ya se encuentra registrado',
                allowOutsideClick: false,
                backdrop: false,
                confirmButtonColor: '#ff0000a8'
              });
            });
        }
        else {
          console.log("Error al extraer informacion del API aqui entro por respuesta del get info  ");
          const postfinanciera = {
            data: {
              "PersonasAcargo": state.infoFinanciera[0].PersonasAcargo,
              "IngresoMensual": state.infoFinanciera[0].IngresoMensual,
              "Rentas": state.infoFinanciera[0].Rentas,
              "OtrosIngresos": state.infoFinanciera[0].OtrosIngresos,
              "TotalIngresos": state.infoFinanciera[0].TotalIngresos,
              "Patrimonio": state.infoFinanciera[0].Patrimonio,
              "PatrimonioRepresentado": state.infoFinanciera[0].PatrimonioRepresentado,
              "CasaAlquilada": state.infoFinanciera[0].CasaAlquilada,
              "ValorArrendamiento": state.infoFinanciera[0].ValorArrendamiento,
              "EgresosMensuales": state.infoFinanciera[0].EgresosMensuales,
              "CedulaMasonica": localStorage.cedula
            }
          }
          axios.post("http://granlogiadecolombia.net:1337/api/tbl-informacion-financieras", postfinanciera, {
            headers: { Authorization: Key }
          })
            .then(resp => {
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario ya se encuentra registrado',
                allowOutsideClick: false,
                backdrop: false,
                confirmButtonColor: '#ff0000a8'
              });
            });
        }
      }
      catch (error) {
        console.log("Error to get info from table informacionFinanciera", error);
      }
    },

    PostInfoSalud: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-saluds?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });

        if (response.data.data[0]) {
          const postSalud = {
            data: {
              "TipoSangre": state.infoSalud[0].TipoSangre,
              "Rh": state.infoSalud[0].Rh,
              "SeguroVida": state.infoSalud[0].SeguroVida,
              "SeguroMedico": state.infoSalud[0].SeguroMedico,
              "CualSeguro": state.infoSalud[0].CualSeguro,
              "Eps": state.infoSalud[0].Eps,
              "EstadoSalud": state.infoSalud[0].EstadoSalud,
              "CedulaMasonica": localStorage.cedula

            }
          }
          axios.put("http://granlogiadecolombia.net:1337/api/tbl-informacion-saluds/" + response.data.data[0].id, postSalud, {
            headers: { Authorization: Key }
          })
            .then(resp => {
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario ya se encuentra registrado',
                allowOutsideClick: false,
                backdrop: false,
                confirmButtonColor: '#ff0000a8'
              });
            });
        }
        else {
          console.log("Error al extraer informacion del API aqui entro por respuesta del get info  ");
          const postSalud = {
            data: {
              "TipoSangre": state.infoSalud[0].TipoSangre,
              "Rh": state.infoSalud[0].Rh,
              "SeguroVida": state.infoSalud[0].SeguroVida,
              "SeguroMedico": state.infoSalud[0].SeguroMedico,
              "CualSeguro": state.infoSalud[0].CualSeguro,
              "Eps": state.infoSalud[0].Eps,
              "EstadoSalud": state.infoSalud[0].EstadoSalud,
              "CedulaMasonica": localStorage.cedula
            }
          }
          axios.post("http://granlogiadecolombia.net:1337/api/tbl-informacion-saluds", postSalud, {
            headers: { Authorization: Key }
          })
            .then(resp => {
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario ya se encuentra registrado',
                allowOutsideClick: false,
                backdrop: false,
                confirmButtonColor: '#ff0000a8'
              });
            });
        }
      }
      catch (error) {
        console.log("Error to get info from table informacionFinanciera", error);
      }
    },

    PostInfoGeneral: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-generals?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });

        if (response.data.data[0]) {
          const postGeneral = {
            data: {
              "ParienteMason": state.infoGeneral[0].ParienteMason,
              "NombreParienteMason": state.infoGeneral[0].NombreParienteMason,
              "LogiaPariente": state.infoGeneral[0].LogiaPariente,
              "CiudadLogiaPariente": state.infoGeneral[0].CiudadLogiaPariente,
              "SugeridoMasoneria": state.infoGeneral[0].SugeridoMasoneria,
              "QuienSugerido": state.infoGeneral[0].QuienSugerido,
              "FormuladoSolicitud": state.infoGeneral[0].FormuladoSolicitud,
              "SolicitudDonde": state.infoGeneral[0].SolicitudDonde,
              "SolicitudCuando": state.infoGeneral[0].SolicitudCuando,
              "SolicitudLogia": state.infoGeneral[0].SolicitudLogia,
              "VinculoPresentaMason": state.infoGeneral[0].VinculoPresentaMason,
              "EntiendeMasoneria": state.infoGeneral[0].EntiendeMasoneria,
              "OportunidadPertenecer": state.infoGeneral[0].OportunidadPertenecer,
              "ProyectVidaMasoneria": state.infoGeneral[0].ProyectVidaMasoneria,
              "EntiendeSociedadSecreta": state.infoGeneral[0].EntiendeSociedadSecreta,
              "PerteneceSociedadSecreta": state.infoGeneral[0].PerteneceSociedadSecreta,
              "CualPerteneceSociedad": state.infoGeneral[0].CualPerteneceSociedad,
              "PrincipioCreador": state.infoGeneral[0].PrincipioCreador,
              "RazonVida": state.infoGeneral[0].RazonVida,
              "AporteMejorarHumanidad": state.infoGeneral[0].AporteMejorarHumanidad,
              "PorquePrincipioCreador": state.infoGeneral[0].PorquePrincipioCreador,
              "CedulaMasonica": localStorage.cedula

            }
          }
          axios.put("http://granlogiadecolombia.net:1337/api/tbl-informacion-generals/" + response.data.data[0].id, postGeneral, {
            headers: { Authorization: Key }
          })
            .then(resp => {
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario ya se encuentra registrado',
                allowOutsideClick: false,
                backdrop: false,
                confirmButtonColor: '#ff0000a8'
              });
            });
        }
        else {
          console.log("Error al extraer informacion del API aqui entro por respuesta del get info  ");
          const postGeneral = {
            data: {
              "ParienteMason": state.infoGeneral[0].ParienteMason,
              "NombreParienteMason": state.infoGeneral[0].NombreParienteMason,
              "LogiaPariente": state.infoGeneral[0].LogiaPariente,
              "CiudadLogiaPariente": state.infoGeneral[0].CiudadLogiaPariente,
              "SugeridoMasoneria": state.infoGeneral[0].SugeridoMasoneria,
              "QuienSugerido": state.infoGeneral[0].QuienSugerido,
              "FormuladoSolicitud": state.infoGeneral[0].FormuladoSolicitud,
              "SolicitudDonde": state.infoGeneral[0].SolicitudDonde,
              "SolicitudCuando": state.infoGeneral[0].SolicitudCuando,
              "SolicitudLogia": state.infoGeneral[0].SolicitudLogia,
              "VinculoPresentaMason": state.infoGeneral[0].VinculoPresentaMason,
              "EntiendeMasoneria": state.infoGeneral[0].EntiendeMasoneria,
              "OportunidadPertenecer": state.infoGeneral[0].OportunidadPertenecer,
              "ProyectVidaMasoneria": state.infoGeneral[0].ProyectVidaMasoneria,
              "EntiendeSociedadSecreta": state.infoGeneral[0].EntiendeSociedadSecreta,
              "PerteneceSociedadSecreta": state.infoGeneral[0].PerteneceSociedadSecreta,
              "CualPerteneceSociedad": state.infoGeneral[0].CualPerteneceSociedad,
              "PrincipioCreador": state.infoGeneral[0].PrincipioCreador,
              "RazonVida": state.infoGeneral[0].RazonVida,
              "AporteMejorarHumanidad": state.infoGeneral[0].AporteMejorarHumanidad,
              "PorquePrincipioCreador": state.infoGeneral[0].PorquePrincipioCreador,
              "CedulaMasonica": localStorage.cedula
            }
          }
          axios.post("http://granlogiadecolombia.net:1337/api/tbl-informacion-generals", postGeneral, {
            headers: { Authorization: Key }
          })
            .then(resp => {
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario ya se encuentra registrado',
                allowOutsideClick: false,
                backdrop: false,
                confirmButtonColor: '#ff0000a8'
              });
            });
        }
      }
      catch (error) {
        console.log("Error to get info from table informacionFinanciera", error);
      }
    },


    PostInfoPersonal: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://localhost:1337/api/cuestionarios?filters[Identificacion][$eq]=' + state.infoPersonal[0].Identificacion, {
          headers: { Authorization: Key }
        });
        console.log(response)
        if (response.data) {
          try {
            const Key = 'Bearer ' + auth.getUserLogged().token;
            const post = {
              data: {
                "Primer_nombre": state.infoPersonal[0].Primer_nombre,
                "Segundo_nombre": state.infoPersonal[0].Segundo_nombre,
                "Primer_apellido": state.infoPersonal[0].Primer_apellido,
                "Segundo_apellido": state.infoPersonal[0].Segundo_apellido,
                "Pais": state.infoPersonal[0].Pais,
                "TipoDocumeto": state.infoPersonal[0].TipoDocumeto,
                "Identificacion": state.infoPersonal[0].Identificacion,
                "Email": state.infoPersonal[0].Email,
                "TelefonoPrefijo": state.infoPersonal[0].TelefonoPrefijo,
                "PhoneWhatsapp": state.infoPersonal[0].PhoneWhatsapp,
                "Edad": state.infoPersonal[0].Edad,
                "Sexo": state.infoPersonal[0].Sexo,
                "Genero": state.infoPersonal[0].Genero,
                "Estado_civil": state.infoPersonal[0].Estado_civil,
                "Nivel_educativo": state.infoPersonal[0].Nivel_educativo,
                "Ocupacion": state.infoPersonal[0].Ocupacion,
                "Religion": state.infoPersonal[0].Religion,
                "Estrato_socioeconomico": state.infoPersonal[0].Estrato_socioeconomico,
                "Ocupacion_actual": state.infoPersonal[0].Ocupacion_actual,
                "Raza_etnia": state.infoPersonal[0].Raza_etnia,
                "Tiempo_diagnostico": state.infoPersonal[0].Tiempo_diagnostico,
                "Tratamiento_antirretroviral": state.infoPersonal[0].Tratamiento_antirretroviral,
                "Cedula": state.infoPersonal[0].Cedula,
                "codeDocumentoFirma": state.infoPersonal[0].codeDocumentoFirma,
              }
            }
            var response = await axios.put('http://localhost:1337/api/cuestionarios/' + response.data.data[0].id, post, {
              headers: { Authorization: Key }
            });
          } catch {
            console.log("aaaadddddddddddddddddddddd")
            try {
              const Key = 'Bearer ' + auth.getUserLogged().token;
              const post = {
                data: {
                  "Primer_nombre": state.infoPersonal[0].Primer_nombre,
                  "Segundo_nombre": state.infoPersonal[0].Segundo_nombre,
                  "Primer_apellido": state.infoPersonal[0].Primer_apellido,
                  "Segundo_apellido": state.infoPersonal[0].Segundo_apellido,
                  "Pais": state.infoPersonal[0].Pais,
                  "TipoDocumeto": state.infoPersonal[0].TipoDocumeto,
                  "Identificacion": state.infoPersonal[0].Identificacion,
                  "Email": state.infoPersonal[0].Email,
                  "TelefonoPrefijo": state.infoPersonal[0].TelefonoPrefijo,
                  "PhoneWhatsapp": state.infoPersonal[0].PhoneWhatsapp,
                  "Edad": state.infoPersonal[0].Edad,
                  "Sexo": state.infoPersonal[0].Sexo,
                  "Genero": state.infoPersonal[0].Genero,
                  "Estado_civil": state.infoPersonal[0].Estado_civil,
                  "Nivel_educativo": state.infoPersonal[0].Nivel_educativo,
                  "Ocupacion": state.infoPersonal[0].Ocupacion,
                  "Religion": state.infoPersonal[0].Religion,
                  "Estrato_socioeconomico": state.infoPersonal[0].Estrato_socioeconomico,
                  "Ocupacion_actual": state.infoPersonal[0].Ocupacion_actual,
                  "Raza_etnia": state.infoPersonal[0].Raza_etnia,
                  "Tiempo_diagnostico": state.infoPersonal[0].Tiempo_diagnostico,
                  "Tratamiento_antirretroviral": state.infoPersonal[0].Tratamiento_antirretroviral,
                  "Cedula": state.infoPersonal[0].Cedula,
                  "codeDocumentoFirma": state.infoPersonal[0].codeDocumentoFirma,
                }
              }
              console.log(post)
              axios.post("http://localhost:1337/api/cuestionarios", post, {
                headers: { Authorization: Key }
              })
                .then(resp => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Guardado Correctamente',
                    text: 'Se registro la informaión con exito',
                    confirmButtonColor: 'green'
                  });
                })
                .catch(error => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error en el registro',
                    allowOutsideClick: false,
                    backdrop: false,
                    confirmButtonColor: '#ff0000a8'
                  });
                });
    
            }
            catch (error) {
              console.log("Error to get info from table informacionPeronal", error, {
                headers: { Authorization: Key }
              });
    
            }
          }
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      } catch (error) {
        try {
          const Key = 'Bearer ' + auth.getUserLogged().token;
          const post = {
            data: {
              "Primer_nombre": state.infoPersonal[0].Primer_nombre,
              "Segundo_nombre": state.infoPersonal[0].Segundo_nombre,
              "Primer_apellido": state.infoPersonal[0].Primer_apellido,
              "Segundo_apellido": state.infoPersonal[0].Segundo_apellido,
              "Pais": state.infoPersonal[0].Pais,
              "TipoDocumeto": state.infoPersonal[0].TipoDocumeto,
              "Identificacion": state.infoPersonal[0].Identificacion,
              "Email": state.infoPersonal[0].Email,
              "TelefonoPrefijo": state.infoPersonal[0].TelefonoPrefijo,
              "PhoneWhatsapp": state.infoPersonal[0].PhoneWhatsapp,
              "Edad": state.infoPersonal[0].Edad,
              "Sexo": state.infoPersonal[0].Sexo,
              "Genero": state.infoPersonal[0].Genero,
              "Estado_civil": state.infoPersonal[0].Estado_civil,
              "Nivel_educativo": state.infoPersonal[0].Nivel_educativo,
              "Ocupacion": state.infoPersonal[0].Ocupacion,
              "Religion": state.infoPersonal[0].Religion,
              "Estrato_socioeconomico": state.infoPersonal[0].Estrato_socioeconomico,
              "Ocupacion_actual": state.infoPersonal[0].Ocupacion_actual,
              "Raza_etnia": state.infoPersonal[0].Raza_etnia,
              "Tiempo_diagnostico": state.infoPersonal[0].Tiempo_diagnostico,
              "Tratamiento_antirretroviral": state.infoPersonal[0].Tratamiento_antirretroviral,
              "Cedula": state.infoPersonal[0].Cedula,
              "codeDocumentoFirma": state.infoPersonal[0].codeDocumentoFirma,
            }
          }
          console.log(post)
          axios.post("http://localhost:1337/api/cuestionarios", post, {
            headers: { Authorization: Key }
          })
            .then(resp => {
              Swal.fire({
                icon: 'success',
                title: 'Guardado Correctamente',
                text: 'Se registro la informaión con exito',
                confirmButtonColor: 'green'
              });
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error en el registro',
                allowOutsideClick: false,
                backdrop: false,
                confirmButtonColor: '#ff0000a8'
              });
            });

        }
        catch (error) {
          console.log("Error to get info from table informacionPeronal", error, {
            headers: { Authorization: Key }
          });

        }
      }

    },
    GetInfoHabeasData: async function ({ commit, state }) {
      console.log("auxilioooo")
      const puk = "puk_d9lABKDf4tWTAHfGAh2SuFVWzDyrAXVv"
      var response = await axios.get('https://dev.auco.ai/v1/ext/document', {
        headers: {
          Authorization: puk,
          'Content-Type': 'application/json'
        },
        // params: { code: "4GYI84YSI" }
        // X3HHOKNEQ
        // UHMZSUNPR
        params: {code:state.infoPersonal[0].codeDocumentoFirma}
      });
      console.log(response.data.signatureProfile[0].status)
      if (response.data.signatureProfile[0].status == "FINISH") {
        return true
      } else {
        return false
      }
      // try {
      //   const Key = 'Bearer ' + auth.getUserLogged().token;
      //   console.log(Key)
      //   var response = await axios.get('http://localhost:1337/api/preguntas', {
      //     headers: { Authorization: Key }
      //   });
      //   if (response.data) {
      //     for (let item = 0; item < response.data.data.length; item++) {
      //       commit('AsignarClasificacionTipo', {
      //         IdPregunta: response.data.data[item].attributes.IdPregunta,
      //         question: response.data.data[item].attributes.question,
      //       })
      //     }
      //   }
      //   else {
      //     console.log("Error al extraer informacion del API ");
      //   }
      // }
      // catch (error) {
      //   console.log("Error, no trajo informacion del api para listar ofertas ", error);
      //   commit('AsignarClasificacionTipo', {
      //     IdPregunta: "",
      //     question: ""
      //   });
      // }
    },

    GetDatosPostulantes: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-postulantes', {
          headers: { Authorization: Key }
        });
        if (response.data.data) {
          state.infoPostulantreAd.splice(0, state.infoPostulantreAd.length);
          for (let index = 0; index < response.data.data.length; index++) {
            commit('AsignacionInformacionPostulanteAd', {
              id: response.data.data[index].id,
              Email: response.data.data[index].attributes.Email,
              NombreApellido: response.data.data[index].attributes.NombreApellido,
              SerParte: response.data.data[index].attributes.SerParte
            })
          }
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      }
      catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
        commit('AsignacionInformacionPersonal', {
          Primer_nombre: "",
          Segundo_nombre: "",
          Primer_apellido: "",
          Segundo_apellido: "",
          Pais: "",
          TipoDocumeto: "",
          Identificacion: "",
          Email: "",
          TelefonoPrefijo: "",
          PhoneWhatsapp: "",
          Edad: "",
          Sexo: "",
          Genero: "",
          Estado_civil: "",
          Nivel_educativo: "",
          Ocupacion: "",
          Religion: "",
          Estrato_socioeconomico: "",
          Ocupacion_actual: "",
          Raza_etnia: "",
          Tiempo_diagnostico: "",
          Tratamiento_antirretroviral: "",
          codeDocumentoFirma: "",
        })
      }
    },



    GetInfoPersonal: async function ({ commit, state }) {
      console.log(state.infoPersonal[0].TipoDocumeto)
      console.log(state.infoPersonal[0].Identificacion)
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://localhost:1337/api/cuestionarios?filters[Identificacion][$eq]=' + state.infoPersonal[0].Identificacion, {
          headers: { Authorization: Key }
        });
        console.log("response")
        console.log(response)
        if (response.data) {
          commit('AsignacionInformacionPersonal', response.data.data[0].attributes)
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      } catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
        Swal.fire({
          icon: 'info',
          title: 'Usuario inexistente',
          text: 'Usuario no se encuentra registrado',
          allowOutsideClick: false,
          backdrop: false,
          confirmButtonColor: '#82b1ff'
        });
      }
    },
    GetInfoCuestionario: async function ({ commit, state }) {
      console.log(state.infoPersonal[0].TipoDocumeto)
      console.log(state.infoPersonal[0].Identificacion)
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://localhost:1337/api/info-encuestas?filters[Identificacion][$eq]=' + state.infoPersonal[0].Identificacion, {
          headers: { Authorization: Key }
        });
        console.log(response)
        if (response.data) {
          commit('AsignacionInformacionCuestionario', response.data.data[0].attributes)
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      } catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
        commit('AsignacionInformacionCuestionario', 
          {
            Cambio_salud_anio: "",
            Intensidad_dolor_actividades: "",
            Interferencia_dolor_actividades: "",
            Limitacion_actividad_fisica: "",
            Limitacion_trabajo_domesticas: "",
            Dificultad_caminar_escaleras: "",
            Dificultad_agacharse_recoger_objetos: "",
            Dificultad_vestirse: "",
            Dificultad_comer: "",
            Dependencia_ayuda_diarias: "",
            Intensidad_dolor: "",
            Impacto_dolor_actividades_habituales: "",
            Limitacion_estado_salud: "",
            Estado_salud_ultimos_meses: "",
            Limitacion_estado_salud_ultimo_12_mes: "",
            Limitacion_estado_salud_ultimos_5_anios: "",
            Percepcion_salud_actual: "",
            Cambio_salud_ultimo_anio: "",
            Sentimiento_energia: "",
            Sentimiento_cansancio: "",
            Dificultad_actividades_falta_energia: "",
            Interferencia_cansancio_actividades: "",
            Limitacion_realizar_actividades_sociales: "",
            Sentimiento_verguenza_situaciones_sociales: "",
            Limitacion_trabajo_estudios: "",
            Dificultad_realizar_tareas: "",
            Dificultad_cuidar_casa: "",
            Dificultad_cuidar_otras_personas: "",
            Dificultad_mantener_estado_animo: "",
            Sentimiento_nerviosismo_inquietud: "",
            Dificultad_actividades_sentirse_triste_deprimido: "",
            Sentimiento_bienestar_emocional: "",
            Dificultad_concentrarse_mantener_atencion: "",
            Dificultad_tomar_decisiones: "",
            Dificultad_dormir: "",
            Identificacion: "",
          })
        Swal.fire({
          icon: 'info',
          title: 'Usuario inexistente',
          text: 'Usuario no se encuentra registrado',
          allowOutsideClick: false,
          backdrop: false,
          confirmButtonColor: '#82b1ff'
        });
      }
    },

    GetInfoEstadoLogia: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-estado-en-logias?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });
        if (response.data) {
          commit('AsignacionInformacionEstadoLogia', response.data.data[0].attributes)
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      }
      catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
        commit('AsignacionInformacionEstadoLogia', {
          Taller: "",
          Grado: "",
          CedulaMasonica: "",
        })
      }
    },
    GetInfoFinanciera: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-financieras?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });
        if (response.data) {
          commit('AsignacionInformacionFinanciera', response.data.data[0].attributes)
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      }
      catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
        commit('AsignacionInformacionFinanciera', {
          PersonasAcargo: "",
          IngresoMensual: "",
          Rentas: "",
          OtrosIngresos: "",
          TotalIngresos: "",
          Patrimonio: "",
          PatrimonioRepresentado: "",
          CasaAlquilada: "",
          ValorArrendamiento: "",
          EgresosMensuales: "",
          CedulaMasonica: "",
        })
      }
    },
    GetInfoSalud: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-saluds?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });
        if (response.data) {
          commit('AsignacionInformacionSalud', response.data.data[0].attributes)
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      }
      catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
        commit('AsignacionInformacionSalud', {
          TipoSangre: "",
          Rh: "",
          DefectoFisico: "",
          CualDefecto: "",
          PadeceEnfermedades: "",
          TratamientoMedico: "",
          CualTratamiento: "",
          SeguroVida: "",
          SeguroMedico: "",
          CualSeguro: "",
          Eps: "",
          GustaLicor: "",
          PorqueGustaLicor: "",
          GustaFumar: "",
          PorqueGustaFumar: "",
          ConsumidoDrogas: "",
          ConsimidoPrescripcionDrog: "",
          ConsumeActualmente: "",
          ConsumePsicofarmacos: "",
          ConsumeActualmentePsico: "",
          EstadoSalud: "",
          CedulaMasonica: "",
        })
      }
    },

    GetInfoGeneral: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get(ENDPOINT_PATH + 'api/tbl-informacion-generals?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });
        if (response.data) {
          commit('AsignacionInformacionGeneral', response.data.data[0].attributes)
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      }
      catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
        commit('AsignacionInformacionGeneral', {
          OpDivorcio: "",
          OpPolitica: "",
          PartidoPolitico: "",
          PosicionesPoliticas: "",
          IdeasPoliticas: "",
          PorqueAfin: "",
          Religion: "",
          PracticaReligion: "",
          PorquePractica: "",
          DefineSiMismo: "",
          VenOtros: "",
          MejorVirtud: "",
          PrincipalFortaleza: "",
          AgradaUsted: "",
          PrincipalDebilidad: "",
          DisgustaUsted: "",
          PeorDefecto: "",
          SociedadesPertenece: "",
          PasatiempoFavorito: "",
          FilosofoFavorito: "",
          PorqueFilosofo: "",
          LibroRecomienda: "",
          PorqueLibro: "",
          ParienteMason: "",
          NombreParienteMason: "",
          LogiaPariente: "",
          CiudadLogiaPariente: "",
          SugeridoMasoneria: "",
          QuienSugerido: "",
          FormuladoSolicitud: "",
          SolicitudDonde: "",
          SolicitudCuando: "",
          SolicitudLogia: "",
          VinculoPresentaMason: "",
          EntiendeMasoneria: "",
          OportunidadPertenecer: "",
          ProyectVidaMasoneria: "",
          AportarMasoneria: "",
          AprenderMasoneria: "",
          EnseniarMasoneria: "",
          EntiendeSociedadSecreta: "",
          PerteneceSociedadSecreta: "",
          CualPerteneceSociedad: "",
          OpinionSecreto: "",
          GuardaSecretos: "",
          ComoGuardaSecretos: "",
          PrincipioCreador: "",
          RazonVida: "",
          RazonPropiaVida: "",
          SacrificioGrande: "",
          MomentoCritico: "",
          SuperarMomentoCritico: "",
          AporteMejorarHumanidad: "",
          Cientifica: "",
          Esoterica: "",
          Academica: "",
          Negocios: "",
          Espiritual: "",
          Filantropica: "",
          Religiosa: "",
          Filosofica: "",
          DesaCreciPersonal: "",
          Politica: "",
          ProblemaJusticia: "",
          PorqueProblemaJusticia: "",
          ProcesoContra: "",
          AutoridadProcesoEncrontra: "",
          Condenado: "",
          PorqueCondenado: "",
          Embargos: "",
          CualEmbargo: "",
          QuebradoComercial: "",
          CausasQuebradoComercial: "",
          CedulaMasonica: "",
        })
      }
    },


    GetInfoAcademica: async function ({ commit, state }) {
      console.log(auth.getUserLogged())
      // try {
      //   const Key = 'Bearer ' + auth.getUserLogged();
      //   var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-academicas?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
      //     headers: { Authorization: Key }
      //   });
      //   if (response.data) {
      //     state.infoAcademica.splice(0, state.infoAcademica.length);
      //     for (let index = 0; index < response.data.data.length; index++) {
      //       commit('AsignacionInformacionAcademica', response.data.data[index].attributes)
      //     }
      //   }
      //   else {
      //     console.log("Error al extraer informacion del API ");
      //   }
      // }
      // catch (error) {
      //   console.log("Error, no trajo informacion del api para listar ofertas ", error);
      // }
    },

    GetInfoProfesional: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-profesionals?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });

        if (response.data) {

          state.infoProfesional.splice(0, state.infoProfesional.length);
          for (let index = 0; index < response.data.data.length; index++) {
            commit('AsignacionInformacionProfesional', response.data.data[index].attributes)
          }
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      }
      catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
      }
    },
    GetInfoIdioma: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-idiomas?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }
        });

        if (response.data) {

          state.infoIdioma.splice(0, state.infoIdioma.length);
          for (let index = 0; index < response.data.data.length; index++) {
            commit('AsignacionInformacionIdioma', response.data.data[index].attributes)
          }
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      }
      catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
      }
    },
    GetInfoVivienda: async function ({ commit, state }) {
      try {
        const Key = 'Bearer ' + auth.getUserLogged().token;
        var response = await axios.get('http://granlogiadecolombia.net:1337/api/tbl-informacion-viviendas?filters[CedulaMasonica][$eq]=' + localStorage.cedula, {
          headers: { Authorization: Key }

        });
        console.log("kkkkkkkklk")
        if (response.data) {

          state.infoVivienda.splice(0, state.infoVivienda.length);
          for (let index = 0; index < response.data.data.length; index++) {
            commit('AsignacionInformacionVivienda', response.data.data[index].attributes)
          }
        }
        else {
          console.log("Error al extraer informacion del API ");
        }
      }
      catch (error) {
        console.log("Error, no trajo informacion del api para listar ofertas ", error);
      }
    },


  },
  modules: {
  }
})
