import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("person", (tableBuilder: Knex.CreateTableBuilder) => {
    tableBuilder.uuid("id").unique().primary();

    tableBuilder.string("name").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("person");
}
