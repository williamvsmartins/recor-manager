import http from '../../services/api';

const alunos = {
    all: () => {
      return http.get('/aluno');
    },
    get: (id) => {
      return http.get(`/aluno/${id}`);
    },
    getDisciplina: (id) => {
        return http.get(`/aluno/aluno-disciplina/${id}`);
    },
    create: (data) => {
      return http.post('/aluno', data);
    },
    update: (id, data) => {
      return http.put(`/aluno/${id}`, data);
    },
    remove: (id) => {
      return http.delete(`/aluno/${id}`);
    }
};

export default alunos;