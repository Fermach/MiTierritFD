<template> 

<!-- MENU LATERAL -->
<div style = "background-color:#D3D3D3 !important ;border-color:#D3D3D3  !important" class="bg-light border-right" id="sidebar-wrapper" >
<div class="sidebar-heading">{{ $t('navigation.filtro') }} </div> 

<!-- BUSQUEDA POR NOMBRE-PRECIO -->
<div class="card mb-3"  style="z-index:20001"> 
 <div class="card-body">

  <div class="row">
   <div class="col-8" >
    <h5 class="card-title">{{ $t('sidebar.busquedaNombre') }}</h5> 
   </div>
   <div class="col-3" style="margin-left:40px" >
				 
		<img @click="limpiarFiltrosTextoPrecio()" src="src/assets/icons8-filtrar-24.png" style="margin-right:20px" />
		<img @click="eliminarFiltrosTextoPrecio()" src="src/assets/icons8-eliminar-26.png"  />
   </div>
   
	<p>Seleccione el filtro para buscar los productos</p>
  </div>
  <b-form-input v-model="textoBusqueda" id="pTextoBusqueda" type="search" disabled>
  </b-form-input>
   
  <p style="margin-top:5px;display:none" id="pTextoBusqueda2" >- {{textoBusqueda}} -</p>
		
  <div class="form-row" style="margin-top:8px">
	<div class="form-group col-md-6">
		
	   <input v-model="rangoSeleccionadoMin" id="pTextoPrecioMin" class="form-control" :placeholder="rangoSeleccionadoMin" type="number" disabled>
	   <label><b> {{ $t('sidebar.precioMin') }}</b></label>
	</div>
	<div class="form-group text-right col-md-6">
		 
		<input  v-model="rangoSeleccionadoMax" id="pTextoPrecioMax" class="form-control" :placeholder="rangoSeleccionadoMax" type="number" disabled>
	  	<label><b> {{ $t('sidebar.precioMax') }}</b></label>
	</div>
  </div> 
  <span class="btn btn-light" @click="buscarDescripcion()" id="pBotonBusqueda" style="margin-top:5px;width:97.5%"  disabled>Buscar</span>
		
 </div>
</div>


<!-- FILTRO POPULARIDAD -->
<div class="card mb-3"  style="z-index:20001">
  <div class="card-body">

    <div class="row">
      <div class="col-4" >
        <h5 class="card-title"> {{ $t('sidebar.popularidad') }}</h5> 		 
	  </div>

      <div class="col-3" style="margin-left:203px" >					 
		<img @click="filtrarPopularidad()" src="src/assets/icons8-filtrar-24.png" style="margin-right:20px" />
		<img @click="eliminarFiltroPopularidad()" src="src/assets/icons8-eliminar-26.png"  />
  
 	  </div>
	
    </div>
	<div >

		  <label class="checkbox-btn">
		    <input @click="actualizarfiltroPopularidad()" id="bajaChecked" type="checkbox" checked disabled>
		    <span class="btn btn-light">  {{ $t('sidebar.popularidadBaja') }} </span>
		  </label>

		  <label class="checkbox-btn" >
		    <input @click="actualizarfiltroPopularidad()" id="mediaChecked" type="checkbox" checked disabled>
		    <span class="btn btn-light">  {{ $t('sidebar.popularidadMedia') }} </span>
		  </label>

		  <label class="checkbox-btn">
		    <input @click="actualizarfiltroPopularidad()" id="altaChecked" type="checkbox" checked disabled>
		    <span class="btn btn-light">  {{ $t('sidebar.popularidadAlta') }} </span>
		  </label>


	</div>
  </div>
</div>


<!-- FILTRO CATEGORIA -->
<div class="card mb-3" style="width:500px;z-index:20001"   elevation="100">
  <div class="card-body" style="margin-below:10px" >
		
    <div class="row">
     <div class="col-4" >
         	<h5 class="card-title"> {{ $t('sidebar.categorias') }}</h5> 
     </div>

     <div class="col-3" style="margin-left:203px" >				 
		 <img @click="filtrarCategoria()" src="src/assets/icons8-filtrar-24.png" style="margin-right:20px"  />
		 <img @click="eliminarFiltroCategoria()" src="src/assets/icons8-eliminar-26.png"  />
  
     </div>
	</div>
	<label style="margin-top:10px" class="checkbox-btn" v-for="(ca) in categorias" >
		<input :id="'inpCategoria' + ca.id "  @click="setCategoria(ca.id)" type="checkbox" checked disabled>
		<span class="btn btn-light"> {{ca.descripcion}} </span>
	</label>

  </div>
</div>

<!-- FILTRO PAIS -->
<div class="card mb-3" style="z-index:20001"  >
  <div class="card-body">
   <div class="row">
     <div class="col-4" >
       <h5 class="card-title"> {{ $t('sidebar.paisOrigen') }}</h5> 
     </div>

     <div class="col-3" style="margin-left:203px" >

		<img  @click="filtrarNacionalidad()" src="src/assets/icons8-filtrar-24.png" style="margin-right:20px" />
		<img  @click="eliminarFiltroNacionalidad()" src="src/assets/icons8-eliminar-26.png"  />
  
     </div>
	</div>
	
	<label style="margin-top:10px" class="custom-control custom-checkbox" v-for="(na) in nacionalidades" disabled >
		  <input :id="'inpNacionalidad' + na.id "  @click="setNacionalidad(na.id)" type="checkbox" class="custom-control-input" checked disabled>
		  <div class="custom-control-label">{{na.nombre}}  </div>
	</label>


  </div>
</div>



</div>

</template>


 
<script>
	import {mapGetters, mapActions} from 'vuex';
	import categoriaTypes from '@/types/categoria';	
	import nacionalidadTypes from '@/types/nacionalidad';
	import productoTypes from '@/types/producto';

  export default {
		name: 'sidebar-item',
		data() {
        return {
				textoBusqueda: 'Sin Filtros',
				bajaChecked: true,
				mediaChecked: true,
				altaChecked: true,
				nacionalidadesExcluidas: [],
				categoriasExcluidas: [],
				rangoSeleccionadoMin: '0€',
				rangoSeleccionadoMax: '1000€',
			
    }
      
    },
		created () {

			 this.$store.dispatch(categoriaTypes.actions.obtenerCategorias);
			 this.$store.dispatch(nacionalidadTypes.actions.obtenerNacionalidades);
      
		},
    methods: {
     	...mapActions({      
             buscarConFiltros: productoTypes.actions.filtrarProductos,
			 desactivarFiltros: productoTypes.actions.desactivarFiltros    
	    }),
        actualizarfiltroPopularidad(){
			//	console.log("popularidad b: "+ $('#bajaChecked').prop('checked').toString());
			//	console.log("popularidad m: "+ $('#mediaChecked').prop('checked').toString());
			//	console.log("popularidad a: "+ $('#altaChecked').prop('checked').toString());
		
				this.bajaChecked=$('#bajaChecked').prop('checked');
		
				this.mediaChecked=$('#mediaChecked').prop('checked');
		
				this.altaChecked=$('#altaChecked').prop('checked');

					this.buscarConFiltros(
					{
						popularidad:{pbaja:this.bajaChecked,pmedia:this.mediaChecked,palta:this.altaChecked}
						,rango:{rangoMin: this.rangoSeleccionadoMin,rangoMax: this.rangoSeleccionadoMax}
						,nacionalidades:this.nacionalidadesExcluidas
						,categorias:this.categoriasExcluidas
						,textoBusqueda:this.textoBusqueda
						});
		  },
		  setNacionalidad(nacionalidad){
			//	console.log("nacionalidad: "+nacionalidad);
				if ($('#inpNacionalidad' + nacionalidad).is(":checked")){
			//			console.log("CHECKED");
						if(this.nacionalidadesExcluidas.includes(nacionalidad)){
				//				console.log("include");
	             	this.nacionalidadesExcluidas= this.nacionalidadesExcluidas.filter(e => e !== nacionalidad);
						}
				}else{
					//	console.log(" NO CHECKED");
							
						if(!this.nacionalidadesExcluidas.includes(nacionalidad)){
						//		console.log("not include");
								this.nacionalidadesExcluidas.push(nacionalidad)
						}
				}
							
							
				this.buscarConFiltros(
					{
						popularidad:{pbaja:this.bajaChecked,pmedia:this.mediaChecked,palta:this.altaChecked}
						,rango:{rangoMin: this.rangoSeleccionadoMin,rangoMax: this.rangoSeleccionadoMax}
						,nacionalidades:this.nacionalidadesExcluidas
						,categorias:this.categoriasExcluidas
						,textoBusqueda:this.textoBusqueda
						});
			},
			setCategoria(categoria){
				//console.log("min: "+this.rangoSeleccionadoMin);
		//		console.log("categoria: "+categoria);
				if ($('#inpCategoria' + categoria).is(":checked")){
			//			console.log("CHECKED");
						if(this.categoriasExcluidas.includes(categoria)){
				//				console.log("include");
	             	this.categoriasExcluidas= 	this.categoriasExcluidas.filter(e => e !== categoria);
						}
				}else{
					//	console.log(" NO CHECKED");
						
						if(!this.categoriasExcluidas.includes(categoria)){
						//		console.log("not include");
								this.categoriasExcluidas.push(categoria)
						}
				}

					this.buscarConFiltros(
					{
						popularidad:{pbaja:this.bajaChecked,pmedia:this.mediaChecked,palta:this.altaChecked}
						,rango:{rangoMin: this.rangoSeleccionadoMin,rangoMax: this.rangoSeleccionadoMax}
						,nacionalidades:this.nacionalidadesExcluidas
						,categorias:this.categoriasExcluidas
						,textoBusqueda:this.textoBusqueda
						});
			},
			buscarDescripcion(){
				$("#pTextoBusqueda2").css("display", "block");
						
				this.buscarConFiltros(
					{
						popularidad:{pbaja:this.bajaChecked,pmedia:this.mediaChecked,palta:this.altaChecked}
						,rango:{rangoMin: this.rangoSeleccionadoMin,rangoMax: this.rangoSeleccionadoMax}
						,nacionalidades:this.nacionalidadesExcluidas
						,categorias:this.categoriasExcluidas
						,textoBusqueda:this.textoBusqueda
						});
			},
			filtrarPopularidad(){
					$('#bajaChecked').prop("disabled", false);	
		   	$('#mediaChecked').prop("disabled", false);
				$('#altaChecked').prop("disabled", false);
				$('#bajaChecked').prop("checked", true);	
		   	$('#mediaChecked').prop("checked", true);
				$('#altaChecked').prop("checked", true);
			
			},
			eliminarFiltroPopularidad(){
				this.bajaChecked=true;
				this.mediaChecked=true;
				this.altaChecked=true;
				$('#bajaChecked').prop("disabled", true);	
		   	$('#mediaChecked').prop("disabled", true);
				$('#altaChecked').prop("disabled", true);
				$('#bajaChecked').prop("checked", true);	
		   	$('#mediaChecked').prop("checked", true);
				$('#altaChecked').prop("checked", true);
				
			this.buscarConFiltros(
					{
						popularidad:{pbaja:this.bajaChecked,pmedia:this.mediaChecked,palta:this.altaChecked}
						,rango:{rangoMin: this.rangoSeleccionadoMin,rangoMax: this.rangoSeleccionadoMax}
						,nacionalidades:this.nacionalidadesExcluidas
						,categorias:this.categoriasExcluidas
						,textoBusqueda:this.textoBusqueda
						});
			},
			filtrarNacionalidad(){
				var r=0;
     		while(r<this.nacionalidades.length ){
						
           $("#inpNacionalidad" + this.nacionalidades[r].id).prop("checked", true);
				   $("#inpNacionalidad" + this.nacionalidades[r].id).prop("disabled", false);
			
				 r++;    
        }
			},
			eliminarFiltroNacionalidad(){
			var r=0;
     		while(r<this.nacionalidades.length ){
						
           $("#inpNacionalidad" + this.nacionalidades[r].id).prop("checked", true);
				   $("#inpNacionalidad" + this.nacionalidades[r].id).prop("disabled", true);
			
				 r++;    
				}
				this.nacionalidadesExcluidas = [];
				this.buscarConFiltros(
					{
						popularidad:{pbaja:this.bajaChecked,pmedia:this.mediaChecked,palta:this.altaChecked}
						,rango:{rangoMin: this.rangoSeleccionadoMin,rangoMax: this.rangoSeleccionadoMax}
						,nacionalidades:this.nacionalidadesExcluidas
						,categorias:this.categoriasExcluidas
						,textoBusqueda:this.textoBusqueda
						});
			},
			filtrarCategoria(){
				var r=0;
     		while(r<this.categorias.length ){
						
           $("#inpCategoria" + this.categorias[r].id).prop("checked", true);
				   $("#inpCategoria" + this.categorias[r].id).prop("disabled", false);
			
				 r++;    
        }
			},
			eliminarFiltroCategoria(){
				var r=0;
     		while(r<this.categorias.length ){
						
           $("#inpCategoria" + this.categorias[r].id).prop("checked", true);
				   $("#inpCategoria" + this.categorias[r].id).prop("disabled", true);
			
				 r++;    
				}
				this.categoriasExcluidas = [];
					this.buscarConFiltros(
					{
						popularidad:{pbaja:this.bajaChecked,pmedia:this.mediaChecked,palta:this.altaChecked}
						,rango:{rangoMin: this.rangoSeleccionadoMin,rangoMax: this.rangoSeleccionadoMax}
						,nacionalidades:this.nacionalidadesExcluidas
						,categorias:this.categoriasExcluidas
						,textoBusqueda:this.textoBusqueda
						});
			},
			eliminarFiltrosTextoPrecio(){
				$("#pTextoBusqueda2").css("display", "none");
				$('#pTextoBusqueda').prop("disabled", true);	
				$('#pTextoPrecioMin').prop("disabled", true);	
				$('#pTextoPrecioMax').prop("disabled", true);	
				$('#pBotonBusqueda').prop("disabled", true);	
				this.textoBusqueda = "Sin Filtros"

				this.rangoSeleccionadoMin = '0€';
				this.rangoSeleccionadoMax= '1000€';

				this.buscarConFiltros(
					{
						popularidad:{pbaja:this.bajaChecked,pmedia:this.mediaChecked,palta:this.altaChecked}
						,rango:{rangoMin: this.rangoSeleccionadoMin,rangoMax: this.rangoSeleccionadoMax}
						,nacionalidades:this.nacionalidadesExcluidas
						,categorias:this.categoriasExcluidas
						,textoBusqueda:this.textoBusqueda
						});
			},
			limpiarFiltrosTextoPrecio(){
				//SE LIMPIAN LOS FILTROS 
				var r =0;

				$("#pTextoBusqueda2").css("display", "none");
				$('#pTextoBusqueda').prop("disabled", false);	
				$('#pTextoPrecioMin').prop("disabled", false);	
				$('#pTextoPrecioMax').prop("disabled", false);	
				$('#pBotonBusqueda').prop("disabled", false);	
				this.textoBusqueda = "Sin Filtros"
				//this.desactivarFiltros();

				this.rangoSeleccionadoMin = '0€';
				this.rangoSeleccionadoMax= '1000€';
			
			},

		
    },
    computed: {
      ...mapGetters({
         categorias: categoriaTypes.getters.categorias  ,    
         nacionalidades: nacionalidadTypes.getters.nacionalidades  
			})
	 }
  }
</script>
