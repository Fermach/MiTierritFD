import types from '@/types/nacionalidad';
import globalTypes from '@/types/global';
import Vue from 'vue';

const state = {
  nacionalidades: null
};

const actions = {
  [types.actions.obtenerNacionalidades]: ({commit}) => {
    commit(globalTypes.mutations.startProcessing);
    
  //  console.log("NACIONALIDADES PROD !! : ");
    Vue.http.get('nacionalidades')
    .then(nacionalidadesOb => {
    
   //   console.log("NACIONALIDADES PROD !! : " + JSON.stringify( nacionalidadesOb));
      commit(types.mutations.nacionalidadesRecibidas, {apiResponse: nacionalidadesOb.body.Nacionalidades});    
      commit(globalTypes.mutations.stopProcessing);
      
    })
    .catch(merror => {
    
     // console.log("ERROR !! : "+JSON.stringify( merror));
      commit(globalTypes.mutations.setError, true);  
      reject(merror);

    })
    .finally(() => {

      commit(globalTypes.mutations.stopProcessing);
    })
  }
};

const getters = {
  [types.getters.nacionalidades]: state => state.nacionalidades
};

const mutations = {
  [types.mutations.nacionalidadesRecibidas]: (state, {apiResponse}) => {

    state.nacionalidades = apiResponse;
 //   console.log(state.nacionalidades)
  }
 
};

export default {
  state,
  actions,
  getters,
  mutations
};
