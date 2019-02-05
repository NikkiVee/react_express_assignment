const { db } = require('../index.js');

const getAllUsers = (req, res, next) => {
  db.any('SELECT * FROM users')
  .then(users => {
    res.status(200).json({
      status: 'success',
      users: users,
      message: 'Received ALL Users!',
    });
  })
  .catch(err => next(err));
};

const getSingleUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.one('SELECT * FROM users WHERE id=$1', [userId])
  .then(users => {
    res.status(200).json({
      status: 'success',
      users: users,
      message: 'Recieved ONE User!',
    });
  })
  .catch(err => next(err));
};

const editUser = (req, res, next) => {
  db.none('UPDATE users SET username=${username}, email=${email}, phone=${phone} WHERE id=${id}', {
    id: parseInt(req.params.id),
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
  })
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Successful User Edit!',
    });
  })
  .catch(err => next(err));
};

const addUser = (req, res, next) => {
  db.none('INSERT INTO users (username, email, phone) VALUES (${username}, ${email}, ${phone})', req.body)
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Successfully Added New User!',
    });
  })
  .catch(err => next(err));
};

module.exports = { getAllUsers, getSingleUser, editUser, addUser };
