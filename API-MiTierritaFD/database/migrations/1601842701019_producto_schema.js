'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoSchema extends Schema {
  up () {
    this.create('Producto', (table) => {
      table.increments()
      table.string('nombre', 60).notNullable(); 
      table.string('descripcion', 250);
      table.decimal('precio').defaultTo(0.0);
      table.integer('nacionalidad_id').unsigned()
      table.foreign('nacionalidad_id').references('Nacionalidad.id');
      table.integer('categoria_id').unsigned()
      table.foreign('categoria_id').references('Categoria.id');
      table.string('demanda', 60); 
      table.string('accesibilidad', 60); 
      table.boolean('activo').defaultTo(true); 
    })
  }

  down () {
    this.drop('Producto')
  }
}

module.exports = ProductoSchema
