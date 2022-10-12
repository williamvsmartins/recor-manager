const express = require('express')
  , router = express.Router()
  , controller = require('./controller');

router
  .get('/', controller.index)
  .get('/:id', controller.show)
  .get('/disciplina/:name', controller.searchByDisciplina)
  .post('/', controller.create)
  .put('/:id', controller.update)
  .delete('/:id', controller.remove);

module.exports = router;
