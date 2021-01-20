const router = require('express').Router();
const { getUsers, getProfile, createUser, updateProfile, updateAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:_id', getProfile);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
