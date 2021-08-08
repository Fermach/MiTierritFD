'use strict'

const Categoria = use ('App/Models/Categoria');

class CategoriaController {

    async getCategorias({response}){
            

        const categorias= await Categoria
         .query()
         .select('id')
         .select('descripcion')
         .fetch()

         if (JSON.stringify(categorias) != "[]"){
           
            return response.json({Error : "False", Message: "Categorias obtenidas con éxito!", Categorias : categorias});

         }else{
           
            return response.json({Error : "True", Message: "No se han encontrado categorias!", Categorias: categorias})   ;

         }  

    
}

}



module.exports = CategoriaController
