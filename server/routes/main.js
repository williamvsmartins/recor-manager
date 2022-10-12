const express = require('express')
  , router = express.Router()
  , config = require('../config/config');

/* endpoints */
router.get('/', (req, res) => {
  res.json({
    'endpoints': config.api.endpoints
  })
});

/* user routes */
router.use('/users', require('./users/route'));

/* tag routes */
router.use('/aluno', require('./aluno/route'));

router.use('/disciplina', require('./disciplina/route'));

/* log routes */
router.use('/chamada', require('./chamada/route'));

module.exports = router;
