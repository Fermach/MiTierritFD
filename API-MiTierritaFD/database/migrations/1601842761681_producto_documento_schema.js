'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoDocumentoSchema extends Schema {
  up () {
    this.create('ProductoDocumento', (table) => {
      table.increments()
      table.integer('producto').unsigned()
      table.foreign('producto_id').references('Producto.id');      
      table.string('nombreDocumento', 60).notNullable();  
      table.integer('tipoDocumento').unsigned()
      table.foreign('tipoDocumento_id').references('TipoDocumento.id'); 
      table.string('ruta', 250).notNullable(); 
      table.boolean('activo').defaultTo(true); 
    })
  }

  down () {
    this.drop('ProductoDocumento')
  }
}

module.exports = ProductoDocumentoSchema
