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
      toast.error("Please provide value in each input field");
    } else {
        // No id mean user is adding record for the first time
        alunos.create(state)
          .then(function (response) {
            console.log(response.data)
            toast.success(`Aluno adicionado com sucesso!`);
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
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="matr">Matrícula:</label>
        <input
          type="number"
          id="email"
          name="matr"
          placeholder="Your Email..."
          value={matr || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="tag">Tag:</label>
        <input
          type="text"
          id="contact"
          name="tag"
          placeholder="Your Contact No..."
          value={tag || ""}
          onChange={handleInputChange}
        />
        <input
          type="hidden"
          id="id_disciplina"
          name="id_disciplina"
          placeholder="Your Contact No..."
          defaultValue={id || ""}
        />

        <input type="submit" value={"Save"} />
      </form>
    </div>
  );
};

export default AddAluno;
