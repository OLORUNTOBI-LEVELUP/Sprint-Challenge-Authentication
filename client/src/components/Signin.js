import React, { useState, useEffect } from "react";
import axios from "axios";

const Signin = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Registers new user
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3300/api/login", { username, password })
      .then(res => props.handleLogin(res.data.token))
      .then(() => props.history.push("/jokes"))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    return () => {
      setUsername("");
      setPassword("");
    };
  }, []);

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input
        type='text'
        placeholder='Username'
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
      />
      <button type='submit'>Log in</button>
    </form>
  );
};

export default Signin;