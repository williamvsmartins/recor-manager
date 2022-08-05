import http from '../../services/api';

const aulas = {
    all: () => {
      return http.get('/disciplina');
    },
    get: (id) => {
      return http.get(`/disciplina/${id}`);
    },
    create: (data) => {
      return http.post('/disciplina', data);
    },
    update: (id, data) => {
      return http.put(`/disciplina/${id}`, data);
    },
    remove: (id) => {
      return http.delete(`/disciplina/${id}`);
    }
};

export default aulas;