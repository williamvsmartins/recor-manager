const express = require('express')
  , router = express.Router()
  , controller = require('./controller');

router
  .get('/', controller.index)
  .get('/:id', controller.show)
  .get('/tag/:tag', controller.searchByTag)
  .get('/aluno-disciplina/:id_disciplina', controller.searchByDisciplina)
  .post('/', controller.create)
  .put('/:id', controller.update)
  .delete('/:id', controller.remove);

module.exports = router;
