const model = require('../../models/users');

const index = (req, res) => {
  return model.all()
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
};

const show = (req, res) => {
  return model.find(req.params.id)
    .then((data) => res.json(data[0]))
    .catch((err) => res.json(err))
};
const searchByUser = (req, res) => {
  return model.searchByUser(req.params.email)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
};

const create = (req, res) => {
  return model.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

const update = (req, res) => {
  return model.update(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

const remove = (req, res) => {
  return model.remove(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

module.exports = {
  index: index,
  show: show,
  searchByUser: searchByUser,
  create: create,
  update: update,
  remove: remove
};
