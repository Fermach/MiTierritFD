import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router';

//vue resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://ec2-18-116-86-79.us-east-2.compute.amazonaws.com:80/api/mitierrita/v1/';
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`);
  next();
});
//.vue resource
import globalTypes from '@/types/global';
import authModule from '@/modules/auth';
import productoModule from '@/modules/producto';

import categoriaModule from '@/modules/categoria';
import nacionalidadModule from '@/modules/nacionalidad';


import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

//vuex
import Vuex from 'vuex';
Vue.use(Vuex);
//.vuex

import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add the specific imported icons
library.add(faEnvelope)
library.add(faUser)
library.add(faFacebook)
library.add(faTwitter)
library.add(faInstagram)
library.add(faWhatsapp)

// Enable the FontAwesomeIcon component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)

import { PaginationPlugin } from 'bootstrap-vue'
Vue.use(PaginationPlugin)

import { BEmbed } from 'bootstrap-vue'
Vue.component('b-embed', BEmbed)

//blockui
import BlockUI from 'vue-blockui';
Vue.use(BlockUI);
//.blockui

import { BModal } from 'bootstrap-vue'
Vue.component('b-modal', BModal)
import { BImg } from 'bootstrap-vue'
Vue.component('b-img', BImg)

import { BContainer, BCol,BRow  } from 'bootstrap-vue'
import { BTable } from 'bootstrap-vue'
Vue.component('b-table', BTable)
Vue.component('b-container', BContainer);
Vue.component('b-col', BCol)
Vue.component('b-row', BRow)

import { FormInputPlugin } from 'bootstrap-vue'
Vue.use(FormInputPlugin)

//vee-validate
import  * as VeeValidate from 'vee-validate';
import validatorEs from '@/validator/es';
import validatorEn from '@/validator/en';
VeeValidate.localize('es', validatorEs);
Vue.use(VeeValidate);
//.vee-validate

//vue-tables-2
import {ClientTable} from 'vue-tables-2';
Vue.use(ClientTable, {}, false, 'bootstrap5', 'default');
//.vue-tables-2

//almacén global de datos con vuex
export const store = new Vuex.Store({
  state: {
    processing: true,
    language: 'es',
    toggle:true
  },
  actions: {
    [globalTypes.actions.changeLanguage]: ({commit}, lang) => {
      commit(globalTypes.mutations.setLanguage, lang);
      switch (lang) {
        case 'en': {
          Validator.localize('en', validatorEn);
          break;
        }
        case 'es': {
          Validator.localize('es', validatorEs);
          break;
        }
      }
    },
    [globalTypes.actions.toggleable]: ({commit}, valor) => {
     
         
        commit(globalTypes.mutations.setToggleable, valor);
      
    }
  },
  getters: {
    [globalTypes.getters.processing]: state => state.processing,
    [globalTypes.getters.language]: state => state.language,
    [globalTypes.getters.toggle]: state => state.toggle
  },
  mutations: {
    [globalTypes.mutations.startProcessing] (state) {
     // console.log("Start P");
      state.processing = true;
    },
    [globalTypes.mutations.stopProcessing] (state) {
      state.processing = false;
    },
    [globalTypes.mutations.setLanguage] (state, lang) {
      state.language = lang;
    },
    [globalTypes.mutations.setToggleable] (state, valor) {
      state.toggle = valor;
    }
  },
  modules: {  
    authModule,
    productoModule,
    nacionalidadModule,
    categoriaModule
  }
});


//vue traducciones
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import messages from '@/translations';
const i18n = new VueI18n({
  locale: store.state.language,
  messages
});
//.vue traducciones

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  i18n,
  router
})
