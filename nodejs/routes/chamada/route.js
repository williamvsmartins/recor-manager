const express = require('express')
  , router = express.Router()
  , controller = require('./controller');

router
  .get('/', controller.index)
  .get('/:id', controller.show)
  .post('/', controller.create)
  .get('/chamada-data/:data', controller.searchByData)
  .get('/chamada-disciplina/:id_disciplina', controller.searchByDisciplina)
  .put('/:id', controller.update)
  .delete('/:id', controller.remove);

module.exports = router;
