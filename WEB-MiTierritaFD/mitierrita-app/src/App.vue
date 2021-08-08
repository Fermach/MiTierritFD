<template>
  <div id="app">


    <!-- ENRUTADOR PRINCIPAL -->
    <Navigation></Navigation>


    <!-- FOOTER -->
 	  <mdb-footer color="stylish-color-dark" class="font-small pt-4 mt-4">
    <mdb-container >
     

       <mdb-row class="pb-3">
        <mdb-col md="6"  class="d-flex justify-content-start">
   
          <h5 class="title">{{ $t('footer.social') }}</h5> 
      
           
        </mdb-col>
         <mdb-col md="6"  class="d-flex justify-content-end" >
          
            <h6 class="title">{{ $t('footer.contactanos') }} </h6> <h4  style="margin-left:8px"> <b>{{ $t('footer.contacto') }} </b></h4>
        
        </mdb-col>
      </mdb-row>
        <mdb-row class="pb-2">
          <mdb-col md="6"  class="d-flex justify-content-start">
   
          
            <a class="fb-ig"  href="https://www.instagram.com/mitierritafd/"> <font-awesome-icon icon="spiner" size="3x"  :icon="['fab', 'instagram']"/></a>
            <a class="fb-fc" style="margin-left:8px"  href="https://www.facebook.com/pages/category/Shopping---Retail/Mi-Tierrita-Food-Drink-105390657998047/"> <font-awesome-icon    size="3x" :icon="['fab', 'facebook']"/></a>
            <a class="fb-fc" style="margin-left:8px"  > <font-awesome-icon    size="3x" :icon="['fab', 'whatsapp']"/></a>
           
        </mdb-col>
         <mdb-col md="6"  class="d-flex justify-content-end" >
          
          <a  style="margin-left:18px" @click="modalShow = !modalShow">
            <u> {{ $t('footer.politicaPrivacidad') }}</u>
          </a>
             
        </mdb-col>
           </mdb-row> 
    </mdb-container>
    <div class="footer-copyright text-center py-3">
      <mdb-container fluid >
        &copy; 2021 Copyright:  MiTierritaFood&Drinks 
      </mdb-container>
    </div>
  </mdb-footer>
   <b-modal  v-model="modalShow" id="modal-privacidad" centered title="Política de Privacidad"  hide-footer>
    <PoliticaPrivacidad></PoliticaPrivacidad>
   </b-modal>

   
  </div>

  
</template>

<script>
  import globalTypes from '@/types/global';
  import {mapGetters} from 'vuex';
  import Navigation from '@/components/Navigation.vue';
  import PoliticaPrivacidad from '@/components/PoliticaPrivacidad.vue';
  import { mdbFooter, mdbContainer, mdbRow, mdbCol } from 'mdbvue';
  
  export default {
    components: {
      Navigation,
		  mdbFooter,
      mdbContainer,
      mdbRow,
      mdbCol,
      PoliticaPrivacidad
		
    },
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        modalShow: false
      } 
    },
    computed: {
      ...mapGetters({
        processing: false,
        toggle:true
      })
    },
    methods: {
   
    }
  }
</script>

<style>


.navbar-header {
    float: left;
    text-align: center;
    width: 100%;
}
.navbar-brand {
    float:none;
    text-decoration: none;
    font-weight: bold;
}
.col-8{
    border-color:  #D3D3D3
}
.col-4{
    border-color:  rgb(53, 126, 53);
}
.navbar {
    background-color: rgba(223, 204, 101, 0.904) !important;
    
}
#carditem{
   background-color: rgba(138, 121, 24, 0.651) !important;
   color: #D3D3D3;
}
carousel{
   background-color: #D3D3D3 !important;
}
body {
    background-color: #D3D3D3 !important;
}
.well {
    background-color: #D3D3D3 !important;
}
.btn {
   background-color: rgba(12, 94, 23, 0.767) !important;
   color: #D3D3D3;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: rgb(0, 0, 0);
}
 p {
 font-size: 12px;
}

th, td{
    color: #b3a953 !important;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}
td {
    background-color: #D3D3D3;
}
hr {
    border: 1px solid rgb(0, 0, 0) !important;
    width: 100%;
}
.page-link.active  {
    background-color: rgb(0, 0, 0) !important;
    color:#D3D3D3 !important;
    border: 1px solid #D3D3D3 !important;
}
#wrapper {
    overflow-x: hidden;
  
}
#btnContact{
  color:white;
  background-color: rgb(26, 66, 26);
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -33rem;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
  background-color: rgb(26, 66, 26);
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
  background-color:rgba(12, 94, 23, 0.767);
  color: #D3D3D3 

}

#sidebar-wrapper .sidebar-content {
  width: 33rem;

}

#page-content-wrapper {
  min-width: 100vw;
   
}

.example-slide {
  align-items: center;
  background-color: #D3D3D3;
  color: #666;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  min-height: 10rem;
}

.carousel-item img{
 width: auto;
 height: 245px;
 max-height: 245px;
 margin: auto; 
 display: block;
 }

@media (min-width: 750px) {
  #sidebar-wrapper {
    margin-left: 0;
    display:none;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 120%;
    margin-left: 20px;
   
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -33rem;
    
  }
  
}


</style>
