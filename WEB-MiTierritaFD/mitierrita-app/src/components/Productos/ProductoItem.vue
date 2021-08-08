<template>
  <!-- CARD ITEM PRODUCTO LISTADO -->
<div class="card " style="width: 16.7rem; height:26rem;">
  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
   <div  @click="detalleProducto(producto.id)" class="carousel-inner">
   
    <div  class="carousel-item active" s style=";width:220px;margin-top:7px;margin-left:9%">
      <img class="d-block w-100" alt="First slide" :src="this.src" style="height:280px"  >

    </div> 
   </div>

  </div>
  <div class="card-body" >

    <ul style="margin-top:7px;" id="carditem" class="list-group list-group-flush">
     <li id="carditem"  class="list-group-item"> <h6>{{ producto.nombre }}  </h6></li>
    </ul> 
    
    <ul   class="list-group list-group-flush">
     <li id="carditem"  class="list-group-item"> <h5> <b>€{{ producto.precio }} </b>  </h5></li>
    </ul>
  </div>

</div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import productoTypes from '@/types/producto';
import globalTypes from '@/types/global';
  export default {
    name: 'producto-item',
    props: {
        producto: {
            type: Object,
            required: true
        },
        index: {
           type: Number,
            required: true
        }
    },
    data () {
      return {
       src:"src/assets/MiTierritaLogo.png"
      }
    },
    created(){
      this.cargarImagen();
     
    },
    updated(){  
      this.cargarImagen();
     
    },
    methods: {
     ...mapActions({      
        setToggleable: globalTypes.actions.toggleable,
        setProducto: productoTypes.actions.obtenerProductoPorID,
        setProductoPesos: productoTypes.actions.obtenerProductoPesos,
        setProductoImagenes: productoTypes.actions.obtenerProductoImagenes,
        setProductoDescripcion: productoTypes.actions.obtenerProductoDescripcion,
        etProductoPesos: productoTypes.actions.obtenerPesosProducto,
        obtenerImagenProducto: productoTypes.actions.obtenerImagenProducto
      }),
      detalleProducto(idProducto){
    
     //    console.log(idProducto)
         this.setProducto(idProducto);
         this.setProductoPesos(idProducto);
         this.setProductoImagenes(idProducto);
         this.setProductoDescripcion(idProducto);

         this.setToggleable(false)
         $("#wrapper").addClass("toggled",true);
          
         //this.cargarDocumentos(idProducto)
         this.$router.push({name: 'productoDetalle' });

      },
      async cargarImagen(){
       await this.obtenerImagenProducto(this.producto.id).then(response => {
      // console.log("r --- " + (response.ruta + "\\"+ response.nombreDocumento))
       var ruta  = ""
       var rutaIni= (response.ruta + "\\"+ response.nombreDocumento)
       this.src =  rutaIni.replace("@","src");
        
       }, error => {
            console.error("Got nothing from server. Prompt user to check internet connection and try again")
       })
      }
    },
    computed: {
       idimagen: {
        get () {
        //console.log("set : " + "imgProductoItem" + this.producto.id)
          return ("imgProductoItem" + this.producto.id).replace("\\","/");
        }
    
       }
    }
  }
</script>

