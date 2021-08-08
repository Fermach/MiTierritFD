<template>
  <!-- SLIDE CABECERA -->
  <b-container fluid class="text-light text-center" >
    <b-row   align-h="center" style="background-color:#D3D3D3; margin-left:1%;margin-right:1%;margin-top:21px ; "> 
      <b-col  md="12" class="my-1" >
      <carousel   style=";margin-top:21px;text-align:center"  :per-page="1" :navigationEnabled="true"  :mouse-drag="true">
         <slide >
           <img src="@/assets/BACK1LOGO.jpg"  style=" margin-left:6% ;width:89%; height: auto; "
                class="d-flex justify-content-center">
       
         </slide>
         <slide >
           <iframe width="90%" height="100%" src="https://www.youtube.com/embed/TCypqaRwYJY?&autoplay=1&loop=1&rel=0&controls=0&showinfo=0&color=white&iv_load_policy=3&playlist=TCypqaRwYJY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         </slide>
         <slide >
           <img src="@/assets/Contact_us_2.png"  style="margin-left:2% ;margin-top:6% ; width: 97%; height: auto; "
                class="d-flex justify-content-center">
       
         </slide>
      </carousel>
      </b-col>
    </b-row>
     <!-- ETIQUETA OCULTA 'SIN RESULTADOS' -->
    <h3 id="pSinResultados" style="margin-top:21px ;color:black"> {{$t('listadoProductos.sinResultados')}}</h3>
 
     <!-- PAGINADORES Y LISTADOS DE PRODUCTOS -->
    <b-row id="displayTabs1" style="margin-top:20px ; margin-right:4px;margin-left:18px; float:left" >
      <b-col md="6" class="my-1" >
        <b-pagination  :total-rows="this.productos.length" :per-page="perPage" v-model="currentPage" class="my-0"/>
      </b-col>
    </b-row>
    <b-row style="margin-top:6px ; margin-right:4px; margin-left:25px;  float:right"> 
         <b-col col="4" v-for="(producto, index) in currentPageItems" style="margin-top:25px">
            
          <producto-item :producto="producto" :index="index" id="divproductos"></producto-item>
            
         </b-col>
    </b-row>
    <b-row id="displayTabs2" style="margin-top:21px ; margin-right:4px; margin-left:18px; float:left;">
      <b-col md="6" class="my-1" >
        <b-pagination  :total-rows="this.productos.length" :per-page="perPage" v-model="currentPage" class="my-0"/>
      </b-col>
    </b-row>
    
  </b-container>
   

</template>

<script>

  import ProductoItem from "@/components/Productos/ProductoItem";
  import productoTypes from '@/types/producto';
  import authTypes from '@/types/auth';
  import globalTypes from '@/types/global';
  import {mapGetters, mapActions,mapMutations} from 'vuex';
  import { Carousel, Slide } from 'vue-carousel';


  export default {
    components: {
      ProductoItem,
      Carousel,
      Slide
    },
    name: 'producto-lista',
    data() {
     return {
      currentPage: 1,
      perPage: 25,
      totalRows: 0,
      currentPageIndex:0,
      currentPageItems:Object,
      paginated_items: {},
      nbPages:0,
      video:{source:'@/assets/mtierritavideo1.mp4',playState:false},
      inicialized: false,
    };
  },
    updated(){
      
      
          this.setToggleable(true);
                 
      },
    created () {
      
          this.$store.dispatch(productoTypes.actions.obtenerProductos);
          $("#wrapper").toggleClass("toggled",true);

          setInterval(() => {

           
             if(this.productos != null) {
                 let lengthAll =this.productos.length;

               
                 if(lengthAll==0){
                   
                   // console.log("***************HOLA" )
                   this.currentPageItems=Object;
                   this.nbPages = 0;
                   this.currentPageIndex=0;
                   this.paginated_items={};
                   this.currentPage= 1;
                   this.perPage= 25;
                   this.totalRows= 0;
                   $("#displayTabs1").css("display", "none");
                   $("#displayTabs2").css("display", "none");
		               $("#pSinResultados").css("display", "block");
         
                 }else{
                         
               //  console.log("***************HOLA2" )
                   $("#displayTabs1").css("display", "block");
                   $("#displayTabs1").css("display", "block");
                   $("#pSinResultados").css("display", "none");
                    this.nbPages = 0;
                    for (let i = 0; i < lengthAll; i = i + this.perPage) {
                        this.paginated_items[this.nbPages] = this.productos.slice(
                         i,
                         i + this.perPage
                      );
                      this.nbPages++;
                     }

                     this.currentPageItems = this.paginated_items[this.currentPage-1];
                }
             
             
                }
                 
        }, 300)
    },
    computed: {
      ...mapGetters({
         productos: productoTypes.getters.productos      
      })
      ,...mapActions({      
        setToggleable: globalTypes.actions.toggleable,
       
      }),
      
    }

  }
</script>
