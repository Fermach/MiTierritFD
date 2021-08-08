import types from '@/types/categoria';
import globalTypes from '@/types/global';
import Vue from 'vue';

const state = {
  categorias: null
};

const actions = {
  [types.actions.obtenerCategorias]: ({commit}) => {
    commit(globalTypes.mutations.startProcessing);
    
  //  console.log("CATEGORIAS PROD !! : ");
    Vue.http.get('categorias')
    .then(categoriasOb => {
    
   //   console.log("CATEGORIAS PROD !! : " + JSON.stringify( categoriasOb));
      commit(types.mutations.categoriasRecibidas, {apiResponse: categoriasOb.body.Categorias});    
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
  }
};

const getters = {
  [types.getters.categorias]: state => state.categorias
};

const mutations = {
  [types.mutations.categoriasRecibidas]: (state, {apiResponse}) => {
 //   console.log("PRODUCTOS-STATE")
    
    state.categorias = apiResponse;
 //   console.log(state.categorias)
  }
 
};

export default {
  state,
  actions,
  getters,
  mutations
};
