'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Producto extends Model {
    static get table () {
        return 'Producto'
    }

    static get createdAtColumn(){

        return null;
    }

    static get updatedAtColumn(){

        return null;
    }

    nacionalidad(){
        return this.belongsTo('App/Models/Nacionalidad',  'nacionalidad_id');

    }

    categoria(){
        return this.belongsTo('App/Models/Categoria',  'categoria_id');

    }

    productoDocumentos(){
        return this.belongsTo('App/Models/ProductoDocumento',  'producto_id');

    }
}

module.exports = Producto
