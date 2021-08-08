'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductoDocumento extends Model {

    static get createdAtColumn(){

        return null;
    }

    static get updatedAtColumn(){

        return null;
    }

    static get table () {
        return 'ProductoDocumento'
      }

    producto(){
        return this.belongsTo('App/Models/Producto',  'producto_id');

    }

    tipoDocumento(){
        return this.belongsTo('App/Models/TipoDocumento',  'tipoDocumento_id');

    }
}

module.exports = ProductoDocumento
