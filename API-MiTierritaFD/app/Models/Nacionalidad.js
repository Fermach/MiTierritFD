'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Nacionalidad extends Model {

    static get createdAtColumn(){

        return null;
    }

    static get updatedAtColumn(){

        return null;
    }

    static get table () {
        return 'Nacionalidad'
    }
    
}

module.exports = Nacionalidad
