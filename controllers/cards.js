const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
  .populate('user')
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send({ message: `Ошибка сервера: ${err}` }));
};

const createCard = (req, res) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: ownerId })
    .then(card => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Неверные данные: ${err}` })
      } else {
        return res.status(500).send({ message: `Ошибка сервера: ${err}` })
      }
    });
};

const deleteCard = (req, res) => {
  const cardId = req.params._id;
  Card.findByIdAndRemove(cardId)
  .then(card => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: `Карточка не найдена: ${err}` })
    } else {
      res.status(500).send({ message: `Ошибка сервера: ${err}` })
    }
  });
};

const likeCard = (req, res) => {
  const cardId = req.params.cardId;
  Card.findByIdAndUpdate(cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Карточка не найдена: ${err}` })
      } else {
        res.status(500).send({ message: `Ошибка сервера: ${err}` })
      }
    });
};

const dislikeCard = (req, res) => {
  const cardId = req.params.cardId;
  Card.findByIdAndUpdate(cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Карточка не найдена: ${err}` })
      } else {
        res.status(500).send({ message: `Ошибка сервера: ${err}` })
      }
    });
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
