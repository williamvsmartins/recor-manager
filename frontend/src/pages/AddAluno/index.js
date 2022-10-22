import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles.css";

import alunos from "./service";

const AddAluno = () => {


  const { id } = useParams();
  const initialState = {
    name: "",
    matr: "",
    tag: "",
    id_disciplina: id
  };
  

  const [state, setState] = useState(initialState);
  const { name, matr, tag, id_disciplina} = state;
  const history = useHistory();
  




  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    console.log(state)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !matr || !tag) {
      toast.error("Por favor, preencha todos os campos!");
    } else {
        // No id mean user is adding record for the first time
        alunos.create(state)
          .then(function (response) {
            console.log(response.data)
            toast.success(`Aluno(a) ${name} foi adicionado(a) com sucesso!`);
          })
          .catch(function (error) {
            toast.error(error);
          });
          setTimeout(() => history.push(`/alunos/${id}`), 500);
      }
    
  };
  return (
    <div className="add-edit">
      <form className="add-edit__form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Seu Nome..."
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="matr">Matrícula:</label>
        <input
          type="number"
          id="email"
          name="matr"
          placeholder="Sua Matrícula..."
          value={matr || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="tag">Tag:</label>
        <input
          type="text"
          id="contact"
          name="tag"
          placeholder="ID do cartão"
          value={tag || ""}
          onChange={handleInputChange}
        />
        <input
          type="hidden"
          id="id_disciplina"
          name="id_disciplina"
          defaultValue={id || ""}
        />

        <input type="submit" value={"Salvar"} />
      </form>
    </div>
  );
};

export default AddAluno;
