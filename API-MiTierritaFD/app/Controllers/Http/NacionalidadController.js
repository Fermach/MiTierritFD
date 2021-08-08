'use strict'

const Nacionalidad = use ('App/Models/Nacionalidad');

class NacionalidadController {

    async getNacionalidades({response}){
            

        const nacionalidades= await Nacionalidad
         .query()
         .select('id')
         .select('nombre')
         .fetch()

         if (JSON.stringify(nacionalidades) != "[]"){
           
            return response.json({Error : "False", Message: "Nacionalidades obtenidos con éxito!", Nacionalidades : nacionalidades});

         }else{
           
            return response.json({Error : "True", Message: "No se han encontrado nacionalidades!", Nacionalidades: nacionalidades})   ;

         }  

    
}
}

module.exports = NacionalidadController
