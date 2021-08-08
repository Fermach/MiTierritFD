'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TipoDocumento extends Model {
    
    static get createdAtColumn(){

        return null;
    }

    static get updatedAtColumn(){

        return null;
    }

    static get table () {
        return 'TipoDocumento'
      }
}

module.exports = TipoDocumento
