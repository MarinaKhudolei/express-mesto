const router = require('express').Router();
const { getUsers, getProfile } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:_id', getProfile);

module.exports = router;
