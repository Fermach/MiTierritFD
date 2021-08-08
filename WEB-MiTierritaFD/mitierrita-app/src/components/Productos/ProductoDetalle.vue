<template>
<div class="container" >
    <!-- DETALLE PRODUCTO -->
 <div class="row">
    <div class="col-8" style="background-color:white;padding:10px;margin-top:20px">
        <carousel style="margin-top:10px"   :per-page="1"  :mouse-drag="true">
         <slide v-for="(imagen) in productoImagenes">
           <img style="margin-left:8%;width:280px;height: auto;"  :src="(imagen.ruta + '\\' + imagen.nombreDocumento).replace('@','src')" class="d-inline-block align-top">
         </slide>
       
        </carousel>
    </div>
    <div class="col-4" style="background-color:white;padding:20px;margin-top:20px">
      <form  style="margin-right:40px;margin-top:10px">
        <h3> {{producto.nombre}} </h3>
        <h1>€ {{producto.precio}} </h1>
        <br/>
        <label> {{ $t('detalleItem.cantidades')}}  </label>
        <select class="form-control" >
          <option v-for="(peso) in productoPesos">         
             {{peso.peso}} {{peso.unidad}}  
          </option>
        </select>
        <br/>
       

        <p style="margin-top:35px;color = black"> 
            {{ $t('detalleItem.gastosEnvio')}}
        </p>

      </form>
    </div>
     <button @click="contactanos()" type="button" style="padding:13px;width:95%;margin-top:35px" class="btn" id="btnContact"> 
           <img src="src/assets/icons8-whatsapp-64.png" style="margin-right:20px" />
            {{ $t('detalleItem.contactanos')}}
        </button>
 </div>


   <!-- TABLA INFO -->
 <div >
  <div class="row">
   <div class="col-4" style="  font-weight: bold;text-style:bold;  border-left-style: solid;border-top-style: solid; background-color:white; padding:10px;margin-top:20px">
           {{ $t('detalleItem.nacionalidad')}}
   </div>

   <div class="col-8" style=" border-right-style: solid; border-top-style: solid;background-color:white;padding:10px;margin-top:20px">
            {{producto.categoria.descripcion}}
   </div>
  </div>

  <div class="row">
   <div class="col-4" style="  font-weight: bold;border-left-style: solid;background-color:white;padding:10px;margin-top:1px">
            {{ $t('detalleItem.categoria')}}
   </div>

   <div class="col-8" style="border-right-style: solid;background-color:white;padding:10px;margin-top:1px">
            {{producto.nacionalidad.nombre}}
   </div>
  </div>

  <div class="row">
   <div class="col-4" style="   font-weight: bold;border-left-style: solid;border-bottom-style: solid;background-color:white;padding:10px;margin-top:1px">
             {{ $t('detalleItem.popularidad')}}
      
   </div>

   <div class="col-8" style=" border-right-style: solid;  border-bottom-style: solid;background-color:white;padding:10px;margin-top:1px">
             {{producto.demanda}}
   </div>
  </div>
 </div>

 <!-- DIV OCULTO INFO -->
 <div class="row"  style="margin-top:25px" v-if="visible">
       <img src="src/assets/Contact_us_2.png"  />     
 </div>
</div>
 
 
   </template>

<script>

  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import productoTypes from '@/types/producto';
  import { Carousel, Slide } from 'vue-carousel';

  export default {
    name: 'producto-detalle',
    data: () => ({
      visible: false
    }),
    mounted () {
      
    },
    components: {
      Carousel,
      Slide
    },
    computed: {
     ...mapGetters({
         producto: productoTypes.getters.obtenerProductoActivo,
         productoImagenes: productoTypes.getters.obtenerProductoActivoImagenes,
         productoPesos: productoTypes.getters.obtenerProductoActivoPesos,
         productoDescripcion: productoTypes.getters.obtenerProductoActivoDescripcion,
         imagenes: productoTypes.getters.obtenerProductoActivoDocumentos
      })
    },
     methods: {
   
      contactanos(){
    
         if (this.visible){
            this.visible=false;
         }else{
            this.visible=true;
         }
         
      }
    },
  }
</script>

<style>

</style>




