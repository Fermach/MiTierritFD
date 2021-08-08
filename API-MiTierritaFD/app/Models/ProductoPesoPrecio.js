'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductoPesoPrecio extends Model {
    static get createdAtColumn(){

        return null;
    }

    static get updatedAtColumn(){

        return null;
    }

    static get table () {
        return 'ProductoPesoPrecio'
      }

    producto(){
        return this.belongsTo('App/Models/Producto',  'producto_id');

    }

    
}

module.exports = ProductoPesoPrecio
