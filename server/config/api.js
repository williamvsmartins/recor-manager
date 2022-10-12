const basePath = `${process.env.APP_URL}api/`;

module.exports = {
  endpoints: {
    'users': `${basePath}users/`,
    'disciplina': `${basePath}disciplina/`,
    'aluno': `${basePath}aluno/`,
    'chamada': `${basePath}chamada/`
  }
}
;
