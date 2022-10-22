import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { toast } from 'react-toastify';

import { Load } from '../../components/Load';

import Disciplinas from './service';

const Sala = () => {

  const [data, setData] = useState([]);


  useEffect(() => {
    async function fetchClasses(){
      const { data } = await Disciplinas.all();
      setData(data)
    }

    fetchClasses();


   /* Disciplinas.all()
      .then((response) => response.data)
      .then((response) => {
        setData(response)
    })*/
  }, [data]);

  const onDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete this record ?")) {
      async function classDelete(){
        await Disciplinas.remove(id);
        toast.success("Disciplina deletada com sucesso!");
      }

      classDelete()


     /* Disciplinas.remove(id)
        .then(function (response) {
          toast.success("User Delete Successfully");
        })
        .catch(function (error) {
          toast.error(error);
        });*/
    }
  };

  return (
    <div className="sala">
      <div className="btn-add">
        <Link to="/AddEditAula">
            <p className='textAdicionar'>
              +
            </p>
          </Link>
      </div>
      
        {data.map((sala) => (
              <div className="row" key={sala.id}>
                <div className="card green">
                  <h2>{sala.name}</h2>
                  <p>Configure a monetização</p>
                 

                  <Link to={`/alunos/${sala.id}`} >
                    <button className='btn btn-edit'>Alunos</button>
                  </Link>

                  <Link to={`/chamada/${sala.id}`} >
                    <button className="btn btn-edit">Chamada</button>
                  </Link>
                  <Link to={`/AddAluno/${sala.id}`}>
                    <button className="btn btn-view">Adicionar Aluno</button>
                  </Link>
                    <button
                      className="btn btn-delete"

                      onClick={() => onDelete(sala.id)}
                    >
                      Apagar
                    </button>
                  
                </div>
              </div>/*
              <tr key={sala.id}>
                <th scope="row">{sala.id}</th>
                <td>{sala.name}</td>
                <td>{sala.matr}</td>
                <td>{sala.tag}</td>
                <td>*/
          ))}
    </div>
  );
};

export default Sala;