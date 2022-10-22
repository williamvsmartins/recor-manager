import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';
import aulas from './service'

import { toast } from 'react-toastify';

const AddEditAula = () => {

  const initialState = {
    name: "",
    hora: "",
  };
  const [state, setState] = useState(initialState);
  const [data, setData] = useState([]);
  const { name, hora } = state;

  const history = useHistory();

  const { id } = useParams();
  useEffect(() => {
    aulas.all()
    .then((response) => response.data)
    .then((response) => {
      setData(response)
    })
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !hora) {
      toast.error("Digite o valor em cada campo de entrada");
    } else {
      if (!id) {
        // No id mean user is adding record for the first time
        aulas.create(state)
        .then(function (response) {
          toast.success("Disciplina criada com sucesso");
        })
        .catch(function (error) {
          toast.error(error);
        });
      } else {
        aulas.update(id, state)
        .then(function (response) {
          toast.success("User Updated Successfully");
        })
        .catch(function (error) {
          toast.error(error);
        });
      }
      setTimeout(() => history.push(`/`), 500);
    }
  };
  return (
    <div className="add-edit">
      <form
        className="add-edit__form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Nome da Disciplina:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Matemática"
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="matr">Horário início da aula:</label>
        <input
          type="time"
          id="email"
          name="hora"
          value={hora || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Salvar"} />
      </form>
    </div>
  );
};

export default AddEditAula;