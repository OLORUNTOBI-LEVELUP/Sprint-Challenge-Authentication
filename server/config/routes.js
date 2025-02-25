const axios = require('axios');
const db = require("../database/dbConfig");
const bcrypt = require("bcrypt")

const { authenticate, generateToken } = require('../auth/authenticate');


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  let user = req.body;
  if(user.username && user.password){
    const hash = bcrypt.hashSync(user.password, 10); 
    user.password = hash;
    db("users")
    .insert(user)
    .then(id =>db('users').where({ id: id[0]}))
    .then(user => {
      const token = generateToken(user)
      return res.status(201).json({ user })
    })
    .catch(error => {
      res.status(500).json(error)
    })
  }else {
    res.status(400).json({
      error: "Username and password needs to be provided"
    })
  }
 
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body
  db("users")
  .where({ username })
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = generateToken(user);
      res.status(200).json({ message: `welcome ${user.username}`, token})
    } else {
      res.status(401).json({ message: `Invalid credentials`})
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
