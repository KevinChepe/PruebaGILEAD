import axios from "axios";
import Cookies from "js-cookie";


//Ruta de la api de autorizacion Strapi
const ENDPOINT_PATH = "http://localhost:1337/api/auth/local";


export default {

    setUserLogged(userLogged) {
      Cookies.set("userLogged", JSON.stringify(userLogged));      
      //Cookies.set("userLogged", JSON.stringify(userLogged));      
    //Cookies.set("userLogged", userLogged);
    },

    getUserLogged() {
      return JSON.parse(Cookies.get('userLogged'));
      //return JSON.stringify(Cookies.get('userLogged'));    
/*       if (JSON.stringify(Cookies.get('userLogged')) == ""){
        return JSON.stringify(Cookies.get('userLogged')); 
      }else{
        return Cookies.getJSON("userLogged"); 
      } */
      
    },

    deleteUserLogged() {
    Cookies.remove('userLogged');
    },

    register(username,email, password,CodigoHabilitacion) {
    const user = {username,email, password,CodigoHabilitacion };
     return axios.post(ENDPOINT_PATH + "/register", user)
    .then(response => {
       console.log(response);
      console.log("Registro correcto") 
      //this.ExisteCodigo = 1;
    })
    .catch(error => {
      // Handle error.  
      //console.log(response);
      this.ExisteCodigo = 0;
      console.log('An error occurred:', error.response);
    });     
    },


  login(identifier, password) {
    const user = {identifier, password};
    return axios.post(ENDPOINT_PATH , user)
    .then(response => {
      // Handle success.
       
      // console.log(axios.post(ENDPOINT_PATH , user));
      // console.log('User profile', response.data.user.CodigoHabilitacion);
      // console.log('User token', response.data.jwt); 
      // console.log('User res', response); 
      
      return response;
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error.response);
      console.log('An error 1234567:', user);
    });
    
  },

  setPersona(persona) {

          const Key = 'Bearer ' + this.getUserLogged().token;
          
          return axios.post('https://www.reportafacilthsapi.xyz/talento-humanos', persona, {
            headers: {
              Authorization: Key
                //'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjEzNTk1NDk5LCJleHAiOjE2MTYxODc0OTl9.j83SNfgJfYBHmkJVbdqGVMWImjwtn19abn-kiN2F_iI',
            },
          }) 
          .then(response => {
            // Handle success.
            // console.log('Well done!');
            // console.log('User profile', response);
            alert("Registro Insertado correctamente.")
            
          })
          .catch(error => {
            // Handle error.
            if( error.response.data.statusCode == 500){
              alert("Imposible insertar el registro, revise que la identificacion no este repetida.")
            }
            console.log('An error occurred:', error.response);
            console.log('An error occurred:', error.response.data.statusCode);
          });    
    },  

    updatePersona(persona,id) {
      const Key = 'Bearer ' + this.getUserLogged().token;
     
      return axios.put('https://www.reportafacilthsapi.xyz/talento-humanos/'+id, persona, {
        headers: {
          Authorization: Key
            //'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjEzNTk1NDk5LCJleHAiOjE2MTYxODc0OTl9.j83SNfgJfYBHmkJVbdqGVMWImjwtn19abn-kiN2F_iI',
        },
      }) 
      .then(response => {
        // Handle success.
  /*       console.log('Well done!');
        console.log('User profile', response); */
        alert("Registro Actualizado correctamente.")
        
      })
      .catch(error => {
        // Handle error.
        if( error.response.data.statusCode == 500){
          alert("Imposible insertar el registro, revise que la identificacion no este repetida.")
        }
        console.log('An error occurred:', error.response);
      });    
      },

      updateEntidadPago(persona,id) {
        const Key = 'Bearer ' + this.getUserLogged().token;
      
        return axios.put('https://www.reportafacilthsapi.xyz/prestadors/'+id, persona, {
          headers: {
            Authorization: Key
              //'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjEzNTk1NDk5LCJleHAiOjE2MTYxODc0OTl9.j83SNfgJfYBHmkJVbdqGVMWImjwtn19abn-kiN2F_iI',
          },
        }) 
        .then(response => {
          // Handle success.
      /*       console.log('Well done!');
          console.log('User profile', response); */
          alert("Registro Actualizado correctamente.")
          
        })
        .catch(error => {
          // Handle error.
          if( error.response.data.statusCode == 500){
            alert("Imposible actualizar el registro, revise que la identificacion no este repetida.")
          }
          console.log('An error occurred:', error.response);
        });    
      },



    EliminarPersona(id){
      
      const Key = 'Bearer ' + this.getUserLogged().token;
      return axios.delete('https://www.reportafacilthsapi.xyz/talento-humanos/' + id, {
        headers: {
          Authorization: Key
            //'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjEzNTk1NDk5LCJleHAiOjE2MTYxODc0OTl9.j83SNfgJfYBHmkJVbdqGVMWImjwtn19abn-kiN2F_iI',
        },
      }) 
      .then(response => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', response);
        
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      }); 

    },

    //Metodo para consultar si la entidad esta e el maestro de entidades
    ConsultaExisteEntidad(codigo){
      return axios.get('https://www.reportafacilthsapi.xyz/prestador/' + codigo).then(response => {

        
          // Handle success.
           
       /*    console.log(axios.post(ENDPOINT_PATH , user));
          console.log('User profile', response.data.user.CodigoHabilitacion);
          console.log('User token', response.data.jwt); 
          console.log('User res', response);  */
          
          //return response.data;
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error.response);
        }); 
      }
  
  
};