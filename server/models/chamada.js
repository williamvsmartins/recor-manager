const db = require('./db');

const table = 'chamada';

const all = () => {
  return db.all(table);
};

const find = (id) => {
  return db.find(table, id);
};

const create = (data) => {
  const query = `INSERT INTO ${table} (name, data, id_user, id_aluno, id_disciplina, status) VALUES ('${data.name}', '${data.data}', 1 , ${data.id_aluno}, '${data.id_disciplina}', ${data.status});`;

  return db.query(query);
};

const update = (id, data) => {
  const query = `UPDATE ${table} SET id_aluno = '${data.id_aluno}', status = ${data.status} WHERE id = ${id};`;

  return db.query(query);
};

const remove = (id) => {
  return db.remove(table, id);
};

//PESQUISAR FREQUENCIA ATRAVÉS DE DATA
const searchByData = (data) => {
  return db.query(`SELECT * FROM ${table} WHERE data BETWEEN '${data}' AND '${data}';`)
};

//PESQUISAR FREQUENCIA ATRAVÉS DA DISCIPLINA
const searchByDisciplina = (disciplina) => {
  return db.query(`SELECT * FROM ${table} WHERE id_disciplina BETWEEN '${disciplina}' AND '${disciplina}';`)
};

module.exports = {
  all: all,
  find: find,
  create: create,
  searchByData: searchByData,
  searchByDisciplina: searchByDisciplina,
  remove: remove
};
