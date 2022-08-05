import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Alunos from './pages/Alunos/';
import Chamada from './pages/Chamada';
import Sala from './pages/Sala'
import AddEditAula from './pages/AddEditAula';
import AddAluno from './pages/AddAluno'
import Header from './components/Header/';
import About from './pages/About/';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer position="top-center" />
        <Switch>
          <Route exact path="/" component={Sala} />
          <Route path="/alunos/:id" component={Alunos} />
          <Route path="/chamada/:id" component={Chamada} />
          <Route path="/addEditAula" component={AddEditAula} />
          <Route path="/addAluno/:id" component={AddAluno} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;