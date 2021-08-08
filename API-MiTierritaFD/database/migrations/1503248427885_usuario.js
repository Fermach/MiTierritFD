'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  up () {
    this.create('Usuario', (table) => {
      table.increments();
      table.string('correo', 80).notNullable().unique();
      table.string('password', 60).notNullable();
      table.integer('tipo_id').unsigned()
      table.foreign('tipo_id').references('TipoUsuario.id');
      table.string('nombre', 60).notNullable();
      table.string('apellidos', 60).notNullable(); 
      table.string('direccion', 240).notNullable();     
      table.string('ciudad', 60).notNullable();
      table.string('provincia', 60).notNullable();
      table.string('pais', 60).notNullable();
      table.integer('nacionalidad_id').unsigned()
      table.foreign('nacionalidad_id').references('Nacionalidad.id');
      table.boolean('activo').defaultTo(true);
      table.timestamps();
    })
  }

  down () {
    this.drop('Usuario')
  }
}

module.exports = UsuarioSchema
