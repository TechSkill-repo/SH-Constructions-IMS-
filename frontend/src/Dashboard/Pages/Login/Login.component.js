import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { signIn } from "../../../redux/actions/authActions";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const count = useSelector();
  const dispatch = useDispatch();


  const handleSubmit = (event) => {
    event.preventDefault();
    const signInAction = signIn({ username, password });
    signInAction(dispatch);
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
