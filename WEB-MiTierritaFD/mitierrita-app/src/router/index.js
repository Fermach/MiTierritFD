import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

//types and components
import Productos from '@/components/Productos/ProductosListado';
import ProductoDetalle from '@/components/Productos/ProductoDetalle';
//.types and components

//global store
import {store} from '@/main';
//.global store

//configurar el router
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'productos',
      component: Productos,
      meta: { Auth: false, title: 'Productos' }
    },
    {
      path: '/productoDetalle',
      name: 'productoDetalle',
      component: ProductoDetalle,
      meta: { Auth: false, title: 'Detelle del Producto' }
    }
  ]
});
//.configurar el router

export default router;
