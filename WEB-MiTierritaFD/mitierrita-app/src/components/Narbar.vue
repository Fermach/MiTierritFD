<template> 
 <!-- NAVIGATION -->
 <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        
    <button v-if="toggleable" class="glyphicon glyphicon-menu-hamburger"  style="margin-left:4px" @click.prevent="toggle()" 
      id="menu-toggle" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
    </button>

    <a  class="navbar-brand" style="margin-left:17px" href="/">
       <img src="@/assets/mtredondalogo.png" alt="" width="30" height="30" class="d-inline-block align-top">
           {{ $t('navigation.nombreNarbar') }}
    </a>
    <ul  class="navbar-nav ms-auto" style="margin-right:15px">
        
      <a  href="/"> <h6 style="color:black"> {{ $t('navigation.tituloNarbar') }} </h6></a>
       
    </ul>
  
 </nav>
</template>


 
<script>
  import globalTypes from '@/types/global'; 
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'narbar-item',
  created(){
    //this.toggle()
        
  },
  reload(){
  },
    methods: {
      ...mapActions({
        
      }),
      toggle(){
     
      if( $("#sidebar-wrapper").css("display")=="none"){
          
          $("#wrapper").toggleClass("toggled");
          $("#sidebar-wrapper").css("display", "block");   
          $("#wrapper").toggleClass("toggled");
          
                
      }else{
          $("#sidebar-wrapper").css("display", "block");
          $("#wrapper").toggleClass("toggled");
    
      }
      
      }
  
    },
     computed: {
     ...mapGetters({
         toggleable: globalTypes.getters.toggle
      })
    }
  }
</script>
