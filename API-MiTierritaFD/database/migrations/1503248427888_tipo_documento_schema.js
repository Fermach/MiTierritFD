'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipoDocumentoSchema extends Schema {
  up () {
    this.create('TipoDocumento', (table) => {
      table.increments()
      table.string('descripcion', 60).notNullable();
      table.string('peso').notNullable();
    })
  }

  down () {
    this.drop('TipoDocumento')
  }
}

module.exports = TipoDocumentoSchema
