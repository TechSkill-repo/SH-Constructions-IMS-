import React, { useState, useEffect } from "react";
import { signIn } from "../../../services/authService";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    signIn({ username, password }).then(data => {
      window.sessionStorage.setItem("user", JSON.stringify(data));
    }).catch(err => console.log(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
          />
        </label>

        <label>
          password:
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
