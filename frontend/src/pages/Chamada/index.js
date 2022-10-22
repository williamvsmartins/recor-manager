import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.css';
import { toast } from 'react-toastify';

import chamada from './service';
import InputPesquisa from '../../components/InputPesquisa'

const Chamada = () => {

  const [info, setinfo] = useState([])
  const [date, setDate] = useState('');


  const { id } = useParams();
  useEffect(() => {//sempre usar quando for fazer requisições API
    if (date) { //só fazer request se o valor do  input existir existir
      chamada.getDate(date)
        .then((response) => response.data)
        .then((response) => {
          var filtrado = response.filter(function(obj) { return obj.id_disciplina == id; });//mostra apenas os registro da matéria selecionada
          setinfo(filtrado)
          console.log(filtrado)

        })
        console.log(date)
    }
  }, [date]);



  const [data, setData] = useState([]);
  useEffect(() => {
    chamada.getDisciplina(id)
    .then((response) => response.data)
    .then((response) => {
      setData(response)
    })
  }, [data]);


  const onDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete this record ?")) {

      chamada.remove(id)
        .then(function (response) {
          toast.success("User Delete Successfully");
        })
        .catch(function (error) {
          toast.error(error);
        });
    }
  };
  return (


    <div className="home">
      <InputPesquisa 
        value={date} 
        onChange={(search) => setDate(search)} 
      />
      { info && (
      <table className="styled-table">
        <thead>
          <tr>
            <th>N° aluno</th>
            <th>Nome</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {info.map((aluno) => (
              <tr key={aluno.id}>
                <th scope="row">{aluno.id}</th>
                <td>{aluno.name}</td>

                <td>

                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(aluno.id)}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default Chamada;