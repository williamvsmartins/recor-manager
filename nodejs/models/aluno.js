const db = require('./db');

const table = 'aluno';

const all = () => {
  return db.all(table);
};

const find = (id) => {
  return db.find(table, id);
};

const searchByTag = (tag) => {
  return db.query(`SELECT * FROM ${table} WHERE tag = '${tag}'`)
};

const create = (data) => {
  const query = `INSERT INTO ${table} (name, matr, tag, id_disciplina) VALUES ('${data.name}', '${data.matr}', '${data.tag}', ${data.id_disciplina});`;

  return db.query(query);
};

const update = (id, data) => {
  const query = `UPDATE ${table} SET tag = '${data.tag}', state = ${data.state} WHERE id = ${id};`;

  return db.query(query);
};

const remove = (id) => {
  return db.remove(table, id);
};

const searchByDisciplina = (disciplina) => {
  return db.query(`SELECT * FROM ${table} WHERE id_disciplina BETWEEN '${disciplina}' AND '${disciplina}';`)
};


module.exports = {
  all: all,
  find: find,
  searchByTag: searchByTag,
  searchByDisciplina: searchByDisciplina,
  create: create,
  update: update,
  remove: remove
};
