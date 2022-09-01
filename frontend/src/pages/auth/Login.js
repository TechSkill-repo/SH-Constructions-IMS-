import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Link from "@material-ui/core/Link";
import Alert from "@mui/material/Alert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signIn } from "../../services/authService";
import logo from "../../vendor/logo.png";

import {
  Container,
  FormField,
  FormContainer,
  Links,
  Form,
  Logo,
} from "./Login.style";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidDetails, setInvalidDetails] = useState(false);
  const [invalidUserName, setInvalidUserName] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username && !password) {
      setInvalidDetails(true);
    }

    signIn({ username, password })
      .then((data) => {
        window.sessionStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/";
      })
      .catch((err) => {
        if (err.response?.status === 404) setInvalidUserName(true);
        else if (err.response?.status === 401) setInvalidPassword(true);
        console.log(err);
      });
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
    <div>
      <Container> </Container>
      <FormContainer>
        <Logo src={logo} />
        <Form onSubmit={handleSubmit} method="post">
          {invalidDetails && (
            <FormField style={{ marginBottom: "1.3em" }}>
              <Alert severity="info">Please enter the credencials 😕</Alert>
            </FormField>
          )}
          {invalidUserName && (
            <FormField style={{ marginBottom: "1.3em" }}>
              <Alert severity="warning">User Email doesn't exists 🚫</Alert>
            </FormField>
          )}
          {invalidPassword && (
            <FormField style={{ marginBottom: "1.3em" }}>
              <Alert severity="error">
                Please enter the correct password 😬
              </Alert>
            </FormField>
          )}
          <FormField>
            <FormControl sx={{ mb: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-weight">
                User Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-weight"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                }
                label="User Email"
              />
            </FormControl>
          </FormField>
          <FormField>
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
          </FormField>
          <FormField style={{ color: "white" }}>
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Keep me logged in 👇"
              size="small"
            />
          </FormField>
          <FormField>
            <Button type="submit" size="large" variant="contained">
              Login
            </Button>
          </FormField>
        </Form>
        {/* <Links>
          <Link href="#" color="inherit">
            About Us
          </Link>
          <Link href="#" color="inherit">
            Contact Us
          </Link>
          <Link href="#" color="inherit">
            Privacy Policy
          </Link>
        </Links> */}
      </FormContainer>
    </div>
  );
};
