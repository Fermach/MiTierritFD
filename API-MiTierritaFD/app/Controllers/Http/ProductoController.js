'use strict'

const Nacionalidad = use ('App/Models/Nacionalidad');
const Categoria = use ('App/Models/Categoria');
const Producto = use ('App/Models/Producto');
const ProductoPesoPrecio = use ('App/Models/ProductoPesoPrecio');
const ProductoDocumento = use ('App/Models/ProductoDocumento');

class ProductoController {


    async getProductos({response}){
            
            const productos= await Producto
             .query()
             .select('id')
             .select('nombre')
             .select('descripcion')
             .select('precio')
             .select('nacionalidad_id')
             .with('nacionalidad')
             .select('categoria_id')
             .with('categoria')
             .with('productoDocumentos')
             .select('demanda')
             .select('accesibilidad')
             .where('activo', true)
             .fetch()

             if (JSON.stringify(productos) != "[]"){
               
                return response.json({Error : "False", Message: "Productos obtenidos con éxito!", Productos : productos});

             }else{
               
                return response.json({Error : "True", Message: "No se han encontrado productos!", Productos: productos})   ;

             }  

        
    }


    async getProductoPorId({response,params}){

            const producto= await Producto
             .query()
             .select('id')
             .select('nombre')
             .select('descripcion')
             .select('precio')
             .select('nacionalidad_id')
             .with('nacionalidad')
             .select('categoria_id')
             .with('categoria')
             .select('demanda')
             .select('accesibilidad')
             .where('id', params.id)
             .fetch()

             if (JSON.stringify(producto) != "[]"){
               
                return response.json({Error : "False", Message: "Producto obtenido con éxito!", Producto : producto});

             }else{
               
                return response.json({Error : "True", Message: "No se ha encontrado producto!", Producto: producto})   ;

            }  
    }

 
    async getProductosCategoria({response,params}){

        const productos= await Producto
         .query()
         .select('id')
         .select('nombre')
         .select('descripcion')
         .select('precio')
         .select('nacionalidad_id')
         .with('nacionalidad')
         .select('categoria_id')
         .with('categoria')
         .select('demanda')
         .select('accesibilidad')
         .where('categoria_id', params.idCategoria)
         .where('activo', true)
         .fetch()

         if (JSON.stringify(productos) != "[]"){
           
            return response.json({Error : "False", Message: "Productos obtenido con éxito!", Productos : productos});

         }else{
           
            return response.json({Error : "True", Message: "No se ha encontrado productos de la categoria indicada!", Productos : productos})   ;

         }  

    }


  
    async getProductosNacionalidad({response,params}){

        const productos= await Producto
         .query()
         .select('id')
         .select('nombre')
         .select('descripcion')
         .select('precio')
         .select('nacionalidad_id')
         .with('nacionalidad')
         .select('categoria_id')
         .with('categoria')
         .select('demanda')
         .select('accesibilidad')
         .where('nacionalidad_id', params.idNacionalidad)
         .where('activo', true)
         .fetch()

         if (JSON.stringify(productos) != "[]"){
           
            return response.json({Error : "False", Message: "Productos obtenido con éxito!", Productos : productos});

         }else{
           
            return response.json({Error : "True", Message: "No se ha encontrado productos de la nacionalidad indicada!", Productos : productos})   ;

         }  

    }

    
    async actualizarProducto({request,params,response,auth}){
        await auth.getUser();
        const producto =await Producto.find(params.id)
        
        if(producto != null){
   
            const productoNuevo = request.all();
            producto.nombre = productoNuevo.nombre;
            producto.descripcion= productoNuevo.descripcion;
            producto.precio= productoNuevo.precio;
            producto.nacionalidad_id= productoNuevo.nacionalidad;
            producto.categoria_id= productoNuevo.categoria;
            producto.demanda= productoNuevo.demanda;
            producto.accesibilidad= productoNuevo.accesibilidad;    
       
            await producto.save();

            return response.json({Error: "False", Message: "Producto actualizado con éxito! "});
        }else{
       
            return response.json({Error: "True", Message:"No fue posible encontrar el producto con el id seleccionado!"})
        }
    }

    

   
    async eliminarProducto({response,params,auth}){
        await auth.getUser();

        const producto =await Producto.find(params.id);

        if(producto != null){
         //   console.log("Nº: "+ JSON.stringify(producto));
         producto.activo =false;
        
         await producto.save();
         return response.json({Error: "False", Message:"Producto eliminado con éxito!"});
         
        }else{
       
              return response.json({Error: "True", Message:"No fue posible encontrar el producto con el id seleccionado!"})
        
        }
    }

  
    async crearProducto({request,response,auth}){
        await auth.getUser();

        const productoNuevo = new Producto();
        const producto= request.all();

    
        productoNuevo.nombre = producto.nombre;
        productoNuevo.descripcion= producto.descripcion;
        productoNuevo.precio= producto.precio;
        productoNuevo.nacionalidad_id= producto.nacionalidad;
        productoNuevo.categoria_id= producto.categoria;
        productoNuevo.demanda= producto.demanda;
        productoNuevo.accesibilidad= producto.accesibilidad;    
        productoNuevo.activo = true

        try{
            await productoNuevo.save();

            return response.json({Error: "False", Message:"Producto añadido con éxito!"});
        }catch{

            return response.json({Error: "True", Message:"No fue posible añadir el producto!"});
        }
        
    }



    async getProductoPesos({response,params}){

        const productosPeso= await ProductoPesoPrecio
         .query()
         .select('id')
         .select('peso')
         .select('unidad')
         .select('producto_id')
         .select('precio')
         .with('producto')
         .where('producto_id', params.id)
         .fetch()

         if (JSON.stringify(productosPeso) != "[]"){
           
            return response.json({Error : "False", Message: " Los pesos del producto indicado fueron obtenidos con éxito!", ProductoPesos : productosPeso});

         }else{
           
            return response.json({Error : "True", Message: "No se encontraron pesos para producto indicada!", ProductoPesos : productosPeso});

         }  

    }
    

    async getProductoDocumentos({response,params}){

        const productosDocumentos = await ProductoDocumento
         .query()
         .select('id')
         .select('nombreDocumento')
         .select('ruta')
         .select('tipoDocumento_id')
         .with('tipoDocumento')       
         .select('producto_id')
         .with('producto')
         .where('producto_id', params.id)
         .fetch()

         if (JSON.stringify(productosDocumentos) != "[]"){
           
            return response.json({Error : "False", Message: " Los documentos del producto indicado fueron obtenidos con éxito!", ProductoDocumentos : productosDocumentos});

         }else{
           
            return response.json({Error : "True", Message: " No se encontraron documentoa para el producto indicado!", ProductoDocumentos : productosDocumentos});

         }  

    }
    

  
    async getProductoDocumentosTipo({response,params}){

        

        const productosDocumentos = await ProductoDocumento
         .query()
         .select('id')
         .select('nombreDocumento')
         .select('ruta')
         .select('tipoDocumento_id')
         .with('tipoDocumento')       
         .select('producto_id')
         .with('producto')
         .where('producto_id', params.id)
         .where('tipoDocumento_id', params.idTipo)
         .fetch()

         if (JSON.stringify(productosDocumentos) != "[]"){
           
            return response.json({Error : "False", Message: " Los documentos del producto y tipo indicado fueron obtenidos con éxito!", ProductoDocumentos : productosDocumentos});

         }else{
           
            return response.json({Error : "True", Message: " No se encontraron documentoa para el producto y del tipo indicado!", ProductoDocumentos : productosDocumentos});

         }  

    }

}

module.exports = ProductoController
