<template> 
<div class="d-flex"  id="wrapper">

    <sidebar-item/>

    <div id="page-content-wrapper">

   	  <narbar-item/>
     
    	<router-view/>

  	</div>


</div>
</template>


 
<script>
	import SidebarItem from "@/components/Sidebar.vue";
	import NarbarItem from "@/components/Narbar.vue";
  import {mapGetters, mapActions} from 'vuex';
  export default {
		name: 'navigation',
		components: {
      NarbarItem,
      SidebarItem
    },
    created(){
           
    },
    methods: {
      ...mapActions({
        
      }),
      toggle(){
     
         //$("#wrapper").toggleClass("toggled");
      }
    }
  }
</script>
