import http from '../../services/api';

const chamada = {
    all: () => {
      return http.get('/chamada');
    },
    get: (id) => {
      return http.get(`/chamada/${id}`);
    },
    getDisciplina: (id) => {
        return http.get(`/chamada/chamada-disciplina/${id}`);
    },
    getDate: (date) => {
        return http.get(`/chamada/chamada-data/${date}`);
    },
    create: (data) => {
      return http.post('/chamada', data);
    },
    update: (id, data) => {
      return http.put(`/chamada/${id}`, data);
    },
    remove: (id) => {
      return http.delete(`/chamada/${id}`);
    }
};

export default chamada;