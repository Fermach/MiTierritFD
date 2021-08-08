import namespace from '@/utils/namespace';

export default namespace('producto', {
  getters: [
    'productos',
    'obtenerProductoActivo',
    'obtenerProductoActivoDocumentos',
    'obtenerProductoActivoImagenes',
    'obtenerProductoActivoDescripcion',
    'obtenerProductoActivoPesos',
    'obtenerImagenRecibida',
    'obtenerImagenesRecibidasItem'
   
     ],
  actions: [
    'obtenerProductos',
    'obtenerProductoPorID',
    'obtenerProductoDocumentos',
    'obtenerImagenProducto',
    'obtenerProductoImagenes',
    'obtenerProductoPesos',
    'obtenerProductoDescripcion',
    'filtrarProductos',
    'desactivarFiltros',
  ],
  mutations: [
    'productosRecibidos',
    'productoRecibido',
    'documentosRecibidos',
    'imagenesRecibidas',
    'pesosRecibidos',
    'descripcionRecibida',
    'imagenRecibida',
    'agregarimagenProducto'
  ]
})
