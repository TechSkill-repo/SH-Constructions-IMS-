import React, { useState, useEffect } from "react";
import { signIn } from "../../services/authService";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";

import {
  Container,
  Form,
  FormContainer,
  Head,
  Head1,
  ImageContainer,
  Paragraph,
} from "./Login.style";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../../vendor/logo.png";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn({ username, password })
      .then((data) => {
        window.sessionStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (prop) => (event) => {
    setPassword(event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <FormContainer>
        <Head>
          <img
            style={{ height: "25vh", width: "100%", objectFit: "contain" }}
            src={logo}
          />
        </Head>
        <Head1>Hello! Please Login</Head1>
        <Paragraph>
          Please Login to your respective Dashboard using your given userEmail
          and Password.
        </Paragraph>
        <form onSubmit={handleSubmit} method="post">
          <Form>
            <FormControl label="User Email" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                User Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-weight"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                endAdornment={<AccountCircle position="end" />}
                aria-described-by="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                label="User Email"
              />
            </FormControl>
          </Form>
          <Form>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Form>
          <Form>
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="If you want to remember your Login Panel ! "
              size="small"
            />
          </Form>
          <Form>
            <Button
              type="submit"
              size="large"
              variant="contained"
              disableElevation
            >
              Login
            </Button>
          </Form>
        </form>
      </FormContainer>
      <ImageContainer>
        <img
          style={{ height: "100vh", width: "100%", objectFit: "cover" }}
          src="https://img.freepik.com/free-vector/multitasking-concept-with-man-computer_23-2148404692.jpg?w=2000"
          // src="https://prod-upp-image-read.ft.com/e94129d6-2c41-11e3-8b20-00144feab7de"
          // src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
        />
      </ImageContainer>
    </Container>
  );
};
