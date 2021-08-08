'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NacionalidadSchema extends Schema {
  up () {
    this.create('Nacionalidad', (table) => {
      table.increments()
      table.string('nombre', 60).notNullable();   
      
    })
  }

  down () {
    this.drop('Nacionalidad')
  }
}

module.exports = NacionalidadSchema
