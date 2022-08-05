import axios from 'axios'

export default axios.create({
  baseURL: "http://127.0.0.1:4000/api"
});

/*
const endpoints = {
    users: `${api}/users`,
    aluno: `${api}/aluno`,
    disciplina: `${api}/disciplina`,
    chamada: `${api}/chamada`,
  };

export default endpoints;*/