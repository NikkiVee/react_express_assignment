var express = require('express');
var router = express.Router();
const { getAllUsers, getSingleUser, editUser, addUser } = require('../db/queries/usersQueries.js');

router.get('/', getAllUsers);
router.get('/:id', getSingleUser);
router.patch('/:id', editUser);
router.post('/', addUser);

module.exports = router;
