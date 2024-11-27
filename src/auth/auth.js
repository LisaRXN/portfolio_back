const bcrypt = require("bcryptjs");
const express = require("express");

let users = [];

// ------------------ Sign In -----------------------//

function login(req, res){
  const { username, password } = req.body;

  // vérification user
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  // vérification password
  const compare_pwd = bcrypt.compareSync(password, user.password);

  if (!compare_pwd) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const user_session = sessionStorage.setItem("username", username);

  // session
  req.session.username = user.username; 

  res.json({ message: "Connexion réussie", user_session });
};

// ------------------ Sign Up -----------------------//

function register(req, res){
  const { username, password } = req.body;

  // vérification user
  const user = users.some(user => user.username === username);

  if(user) {
    return res.status(400).json({ message: "User already exist" });
  }

  // hash password
  const salt = bcrypt.genSaltSync(10);
  const hash_pass = bcrypt.hashSync(password, salt);

  users.push({ username: username, password: hash_pass });
  console.log(users)
  res.json({ message: "User registered successfully" });
};


module.exports = {
    login,
    register,
    users
  };