const User = require('../models/user');

function userErrorHandler(res, err) {
  if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
    return res.status(400).send({ message: `Неверные данные: ${err}` });
  }
  return res.status(500).send({ message: `Ошибка сервера: ${err}` });
}

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => userErrorHandler(res, err));
};

const getProfile = (req, res) => {
  const userId = req.params._id;
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: `Нет пользователя с таким id: ${userId}` });
      }
      return res.status(200).send(user);
    })
    .catch((err) => userErrorHandler(res, err));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => userErrorHandler(res, err));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => userErrorHandler(res, err));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => userErrorHandler(res, err));
};

module.exports = {
  getUsers, getProfile, createUser, updateProfile, updateAvatar,
};
