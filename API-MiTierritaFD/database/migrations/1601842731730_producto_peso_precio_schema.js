'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoPesoPrecioSchema extends Schema {
  up () {
    this.create('ProductoPesoPrecio', (table) => {
      table.increments()
      table.integer('producto_id').unsigned()
      table.foreign('producto_id').references('Producto.id');
      table.decimal('peso').defaultTo(0.0);
      table.decimal('precio').defaultTo(0.0);
      table.string('unidad').notNullable().defaultTo("gr");
    })
  }

  down () {
    this.drop('ProductoPesoPrecio')
  }
}

module.exports = ProductoPesoPrecioSchema
