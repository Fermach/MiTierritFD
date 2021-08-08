'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipoUsuarioSchema extends Schema {
  up () {
    this.create('TipoUsuario', (table) => {
      table.increments()
      table.string('descripcion', 60).notNullable();   
    })
  }

  down () {
    this.drop('TipoUsuario')
  }
}

module.exports = TipoUsuarioSchema
