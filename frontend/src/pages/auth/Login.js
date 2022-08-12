import React, { useState, useEffect } from "react";
import { signIn } from "../../services/authService";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Container,
  Form
} from "./Login.style";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    signIn({ username, password }).then(data => {
      window.sessionStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/"
    }).catch(err => console.log(err));
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <div className="wrapper">
        <div className="formContainer">
          <div className="formWrapper">
            <div className="header">
              <h1 className="logo">
                SH Constructions
              </h1>
              <h1 className="title">Login</h1>
            </div>
            <Form onSubmit={handleSubmit}>
              <TextField id="username" name="username" label="Username" variant="filled" value={username} onChange={(e) => { setUsername(e.target.value) }} />
              <FormControl sx={{ my: 1.5 }} variant="filled">
                <InputLabel htmlFor="password">Password</InputLabel>
                <FilledInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <div className="links">
                <Box>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                </Box>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                >
                  Forget Password
                </Link>
              </div>
              <button type="submit" className="logInBtn">Login</button>
              <p>For creating your account contact your IT admin.</p>
            </Form>
          </div>
        </div>
        <div className="formBg"></div>
      </div>
    </Container>
  );
}
