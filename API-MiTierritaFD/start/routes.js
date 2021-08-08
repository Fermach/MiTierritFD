'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=>{
    
    Route.get('serve',   'UsuarioController.serve');
    Route.post('login',  'UsuarioController.login');

    Route.get('usuario/:id',   'UsuarioController.getUsuarioPorId').middleware(['auth:jwt']);                                           
    Route.get('usuarios',   'UsuarioController.getUsuarios').middleware(['auth:jwt']);              
    Route.post('registro',  'UsuarioController.registro');

    Route.put('usuario/:id',  'UsuarioController.actualizarUsuario').middleware(['auth:jwt']);
    Route.put('usuario/deshabilitar/:id',  'UsuarioController.deshabilitarUsuario').middleware(['auth:jwt']);
    Route.put('usuario/habilitar/:id',  'UsuarioController.habilitarUsuario').middleware(['auth:jwt']);
    Route.get('productos', 'ProductoController.getProductos');
    Route.get('producto/:id', 'ProductoController.getProductoPorId');
    Route.get('productos/categoria/:idCategoria', 'ProductoController.getProductosCategoria');
    Route.get('productos/nacionalidad/:idNacionalidad', 'ProductoController.getProductosNacionalidad');

    Route.put('producto/:id', 'ProductoController.actualizarProducto').middleware(['auth:jwt']);
    Route.delete('producto/:id', 'ProductoController.eliminarProducto').middleware(['auth:jwt']);
    Route.post('producto', 'ProductoController.crearProducto').middleware(['auth:jwt']);
    Route.get('producto/:id/pesos', 'ProductoController.getProductoPesos');
    Route.get('producto/:id/documentos', 'ProductoController.getProductoDocumentos');
    Route.get('producto/:id/documentos/tipo/:idTipo', 'ProductoController.getProductoDocumentosTipo');
    Route.get('nacionalidades', 'NacionalidadController.getNacionalidades');
    Route.get('categorias', 'CategoriaController.getCategorias');   

}).prefix("api/mitierrita/v1");

Route.any('*', ({ view }) => view.render('welcome'));
