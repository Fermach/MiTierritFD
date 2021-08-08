'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriaSchema extends Schema {
  up () {
    this.create('Categoria', (table) => {
      table.increments()
      table.string('descripcion', 60).notNullable();  
    })
  }

  down () {
    this.drop('Categoria')
  }
}

module.exports = CategoriaSchema
