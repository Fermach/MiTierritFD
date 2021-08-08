import types from '@/types/producto';
import globalTypes from '@/types/global';
import Vue from 'vue';

const state = {
  filtrosActivados: false,
  productosOriginal: [],
  productos: [],
  productoActivo: Object,
  productoActivoPesos: [],
  productoActivoImagenes: [],
  productoActivoDescripcion: [],
  productoDocumentos: null,
  productoVideos: null,
  productoArchivos: null,
  imagenesRecibidasItem: []
};

const actions = {
  [types.actions.obtenerProductos]: ({commit}) => {
    commit(globalTypes.mutations.startProcessing);
    
   // console.log("OBTENIENDO PROD !! : ");
    Vue.http.get('productos')
    .then(productosOb => {
    
   //   console.log("OBTENIENDO PROD !! : " + JSON.stringify( productosOb));
      commit(types.mutations.productosRecibidos, {apiResponse: productosOb.body.Productos});    
      commit(globalTypes.mutations.stopProcessing);
      
    })
    .catch(merror => {
    
    //  console.log("ERROR !! : "+JSON.stringify( merror));
      commit(globalTypes.mutations.setError, true);  
      reject(merror);

    })
    .finally(() => {

      commit(globalTypes.mutations.stopProcessing);
    })
  },
  [types.actions.filtrarProductos]: ({commit}, objFiltros ) => {
    commit(globalTypes.mutations.startProcessing);
    
         
   // console.log("FILTRANDO PROD !! : ");
    state.filtrosActivados = true;
    state.productos=state.productosOriginal;
  //  console.log("FILTRO: " + JSON.stringify(objFiltros).toString() );
    
    var eliminado = false;
    var i = 0;
    var r = 0;
    while(i<state.productos.length ){
     
      //FILTROS DE NACIONALIDAD
      r=0;
      eliminado = false;
      //console.log("naciona1: " + state.productos[i].descripcion );
      while(r<objFiltros.nacionalidades.length ){
     
        if (state.productos[i].nacionalidad_id == objFiltros.nacionalidades[r]){
       //  console.log("EQUAL: " + state.productos[i].nacionalidad_id  +" - " + JSON.stringify(objFiltros.nacionalidades[r]).toString() );

         state.productos= state.productos.filter(e => e.id !== state.productos[i].id);
         eliminado=true;
         break;
        }
        r++;

      }
   // console.log("continuamooh.." );

      if(eliminado){
     //   console.log("FUERA.." );
        continue;
      }

      eliminado=false;
      //console.log("p: "  + state.productos[i].id  + state.productos[i].descripcion );
      //console.log("p cat: "  + state.productos[i].categoria_id  );
      //console.log("cat seleccionadas: "  + state.productos[i].categoria_id  );

      //FILTROS DE CATEGORIA
      r=0;
      while(r<objFiltros.categorias.length ){
     //   console.log("cat seleccionada: "  + objFiltros.categorias[r]  );

        if (state.productos[i].categoria_id == objFiltros.categorias[r]){
          
        //  console.log("EQUAL" );

          state.productos= 	state.productos.filter(e => e.id !== state.productos[i].id);
          eliminado=true;
          break;
        }
        
       r++;    
      }

    //  console.log("continuamooh 2.." );

      if(eliminado){
      //  console.log("FUERA2.." );
        continue;
      }

      
      //FILTROS DE POPULARIDAD
      if (!objFiltros.popularidad.pbaja && state.productos[i].demanda.toString() =="Baja" ){
        //  console.log("baja");  
        state.productos= 	state.productos.filter(e => e.id !== state.productos[i].id);
            continue;
      }
      if (!objFiltros.popularidad.pmedia && state.productos[i].demanda.toString() =="Media" ){
    //    console.log("media");   
        state.productos= 	state.productos.filter(e => e.id !== state.productos[i].id);
            continue;
      }
      if (!objFiltros.popularidad.palta && state.productos[i].demanda.toString() =="Alta" ){
     //   console.log("alta");    
        state.productos= 	state.productos.filter(e => e.id !== state.productos[i].id);
            continue;
      }
     
      //console.log("pl: "+ state.productos.length.toString())  
 

      
      //FILTROS DE TEXTO
      if (objFiltros.textoBusqueda.toString() != "Sin Filtros"){
        
        if ( !state.productos[i].descripcion.toString().toUpperCase().trim().includes(objFiltros.textoBusqueda.toString().toUpperCase().trim()) ){
          state.productos= 	state.productos.filter(e => e.id !== state.productos[i].id);
          continue;
        } 

      }
      
      //FILTROS DE RANGO
      if (parseInt(objFiltros.rango.rangoMin, 10)>parseInt(state.productos[i].precio, 10) ){
          state.productos= 	state.productos.filter(e => e.id !== state.productos[i].id);
          continue;
      } 
   
      if (parseInt(objFiltros.rango.rangoMax, 10)<parseInt(state.productos[i].precio, 10) ){
        state.productos= 	state.productos.filter(e => e.id !== state.productos[i].id);
        continue;
      } 
  

       i++;
     
    }
   	
 
  },
  [types.actions.desactivarFiltros]: ({commit}) => {
    commit(globalTypes.mutations.startProcessing);
 //   console.log("DESACTIVANDO FILTROS PROD !! : ");
   
     state.filtrosActivados = false;
     state.productos = state.productosOriginal;
  },
  [types.actions.obtenerProductoPesos]: ({commit}, idProducto) => {
    commit(globalTypes.mutations.startProcessing);
    
  //  console.log("OBTENIENDO PESOS !! : ");
    Vue.http.get('producto/' + idProducto + '/pesos')
    .then(pesosOb => {
    
  //    console.log("PESOS PROD !! : " + JSON.stringify( pesosOb.body.ProductoPesos));
      commit(types.mutations.pesosRecibidos, {apiResponse: pesosOb.body.ProductoPesos});    
      commit(globalTypes.mutations.stopProcessing);
      
    })
    .catch(merror => {
    
   //   console.log("ERROR !! : "+JSON.stringify( merror));
      commit(globalTypes.mutations.setError, true);  
      reject(merror);

    })
    .finally(() => {

      commit(globalTypes.mutations.stopProcessing);
    })
  },
  [types.actions.obtenerProductoImagenes]: ({commit}, idProducto) => {
    commit(globalTypes.mutations.startProcessing);
    
   // console.log("OBTENIENDO PRODUCTO IMAGENES !! : ");
    Vue.http.get('producto/' + idProducto + '/documentos/tipo/1')
    .then(imagenesOb => {
    
  //    console.log("IMAGENES PROD !! : " + JSON.stringify( imagenesOb.body.ProductoDocumentos));
      commit(types.mutations.imagenesRecibidas, {apiResponse: imagenesOb.body.ProductoDocumentos});    
      commit(globalTypes.mutations.stopProcessing);
      
    })
    .catch(merror => {
    
    //  console.log("ERROR !! : "+JSON.stringify( merror));
      commit(globalTypes.mutations.setError, true);  
      reject(merror);

    })
    .finally(() => {

      commit(globalTypes.mutations.stopProcessing);
    })
  },
  [types.actions.obtenerProductoDescripcion]: ({commit}, idProducto) => {
    commit(globalTypes.mutations.startProcessing);
    
  //  console.log("OBTENIENDO PRODUCTO DESCRIPCION !! : ");
    Vue.http.get('producto/' + idProducto + '/documentos/tipo/3')
    .then(descripcionOb => {
    
      console.log("DESCRIPCION PROD !! : " + JSON.stringify( descripcionOb.body.ProductoDocumentos));
      commit(types.mutations.descripcionRecibida, {apiResponse: descripcionOb.body.ProductoDocumentos});    
      commit(globalTypes.mutations.stopProcessing);
      
    })
    .catch(merror => {
    
 //     console.log("ERROR !! : "+JSON.stringify( merror));
      commit(globalTypes.mutations.setError, true);  
      reject(merror);

    })
    .finally(() => {

      commit(globalTypes.mutations.stopProcessing);
    })
  },
  [types.actions.obtenerProductoPorID]: ({commit}, idProducto) => {
    commit(globalTypes.mutations.startProcessing);
    Vue.http.get('producto/'+idProducto)
    .then(productoOb => {
  //   console.log("pr-ob: "+ JSON.stringify(productoOb.body.Producto))
  //
      commit(types.mutations.productoRecibido, {productoOb: productoOb.body.Producto});    
      commit(globalTypes.mutations.stopProcessing);
      
    })
    .catch(merror => {
    
 //     console.log("ERROR !! : "+JSON.stringify( merror));
      commit(globalTypes.mutations.setError, true);
    
      reject(merror);

    })
    .finally(() => {
      commit(globalTypes.mutations.stopProcessing);
    })
  },
  [types.actions.obtenerProductoDocumentos]: ({commit} ,idProducto) => {
    commit(globalTypes.mutations.startProcessing);
 //   console.log("pr documentos: " +  idProducto +" - ")
  
    //cargamos imagenes
    Vue.http.get('producto/' + idProducto + '/documentos'   )
    .then(productoDocumentos => {
     // console.log("pr documentos 1: " + JSON.stringify(productoDocumentos.body.ProductoDocumentos))
  
      commit(types.mutations.documentosRecibidos, {apiResponse: productoDocumentos.body.ProductoDocumentos});    
      commit(globalTypes.mutations.stopProcessing);
      
    })
    .catch(merror => {
    
   //   console.log("ERROR !! : "+JSON.stringify( merror));
      commit(globalTypes.mutations.setError, true);
    
      reject(merror);

    })
    .finally(() => {
      commit(globalTypes.mutations.stopProcessing);
    })

  },
  [types.actions.obtenerImagenProducto]: ({commit}, idProducto) => {
    commit(globalTypes.mutations.startProcessing);

  //  console.log("pr obtenerImagenProducto: " +  idProducto.toString() +" - ")
    return new Promise((resolve, reject) => {
      Vue.http.get('producto/' + idProducto + '/documentos/tipo/1').then(imagen => {
        //  console.log("pr 2 obtenerImagenProducto: " +  JSON.stringify(imagen.body.ProductoDocumentos[0]))

          resolve(imagen.body.ProductoDocumentos[0]);    
          commit(globalTypes.mutations.stopProcessing);
         
      }).catch(error => {
          reject(error);

        }).finally(() => {
          commit(globalTypes.mutations.stopProcessing);
        })
    })
  },
};

const getters = {
  [types.getters.productos]: state => state.productos,
  [types.getters.obtenerProductoActivo]: state => state.productoActivo[0],
  [types.getters.obtenerProductoActivoPesos]: state => state.productoActivoPesos,
  [types.getters.obtenerProductoActivoImagenes]: state => state.productoActivoImagenes,
  [types.getters.obtenerProductoActivoDescripcion]: state => state.productoActivoDescripcion,
  [types.getters.obtenerProductoActivoDocumentos]: state => state.productoDocumentos,
  [types.getters.obtenerImagenRecibida]: state =>  state.imagenRecibidaItem ,
  [types.getters.obtenerImagenesRecibidasItem]: state =>  {
    state.imagenesRecibidasItem
  }
};

const mutations = {
  [types.mutations.productosRecibidos]: (state, {apiResponse}) => {
    //console.log("PRODUCTOS-STATE" +state.filtrosActivados)
       
    state.productosOriginal = apiResponse;
    if (!state.filtrosActivados){

      state.productos = apiResponse;
    }
   // console.log(state.productos)
  },
  [types.mutations.productoRecibido]: (state, {productoOb}) => {
 //   console.log("SET PRODUCTO ACTIVO -- " + JSON.stringify( productoOb));

     state.productoActivo = productoOb;

  },
  [types.mutations.documentosRecibidos]: (state, {apiResponse}) => {
  //  console.log(" - documentosRecibidos - ")
  //  console.log(" - " + apiResponse + "")

    state.productoDocumentos = apiResponse;  
    //console.log(state.apiResponse)
  },
  [types.mutations.pesosRecibidos]: (state, {apiResponse}) => {
   // console.log(" - pesosRecibidos - ")
  //  console.log(" - " + apiResponse + "")

    state.productoActivoPesos = apiResponse;  
 //   console.log(state.apiResponse)
  
  },
  [types.mutations.imagenesRecibidas]: (state, {apiResponse}) => {
   // console.log(" - imagenesRecibidas - ")
   // console.log(" - " + apiResponse + "")

    state.productoActivoImagenes = apiResponse;  
   // console.log(state.apiResponse)
  },
  [types.mutations.descripcionRecibida]: (state, {apiResponse}) => {
  //  console.log(" - descripcionRecibida - ")
  //  console.log(" - " + apiResponse + "")

    state.productoActivoDescripcion = apiResponse;  
   // console.log(state.apiResponse)
  },
  [types.mutations.imagenRecibida]: (state, {apiResponse}) => {
   // console.log(" - imagenRecibida - ")
   // console.log(" - " + apiResponse + "")

    state.imagenRecibidaItem = apiResponse;  
  
  },
  [types.mutations.agregarimagenProducto]: (state, {imagen}) => {

     state.imagenesRecibidasItem.push(imagen) ;  
  
  }
 
};

export default {
  state,
  actions,
  getters,
  mutations
};
