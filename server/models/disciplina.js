const db = require('./db');

const table = 'disciplina';

const all = () => {
  return db.all(table);
};

const find = (id) => {
  return db.find(table, id);
};

const searchByDisciplina = (name) => {
  return db.query(`SELECT * FROM ${table} WHERE name = '${name}'`)
};

const create = (data) => {
  const query = `INSERT INTO ${table} (name, hora) VALUES ('${data.name}', '${data.hora}')`;

  return db.query(query);
};

const update = (id, data) => {
  const query = `UPDATE ${table} SET name = '${data.name}', hora = ${data.hora} WHERE id = ${id};`;

  return db.query(query);
};

const remove = (id) => {
  return db.remove(table, id);
};

module.exports = {
  all: all,
  find: find,
  searchByDisciplina: searchByDisciplina,
  create: create,
  update: update,
  remove: remove
};
