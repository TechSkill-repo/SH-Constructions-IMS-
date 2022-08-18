import React, { useState } from "react";
import { signIn } from "../../services/authService";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";

import {
  Container,
  Form,
  FormContainer,
  Head,
  ImageContainer,
  Paragraph,
  Logo,
  Wrapper,
} from "./Login.style";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../../vendor/logo.png";

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
    <Container>
      <FormContainer>
        <Logo src={logo} />
        <Wrapper>
          <Head>Hi 👋 Please Login</Head>
          <Paragraph>
            Please Login to your respective Dashboard using your given userEmail
            and Password.
          </Paragraph>
          <form onSubmit={handleSubmit} method="post" style={{ width: "62%" }}>
            {invalidDetails && (
              <Form style={{ marginBottom: "1.3em" }}>
                <Alert severity="info">
                  Please enter the user email and password 😕
                </Alert>
              </Form>
            )}
            {invalidUserName && (
              <Form style={{ marginBottom: "1.3em" }}>
                <Alert severity="warning">
                  User Email doesn't exists 🚫 — check it out!
                </Alert>
              </Form>
            )}
            {invalidPassword && (
              <Form style={{ marginBottom: "1.3em" }}>
                <Alert severity="error">
                  Please enter the correct password 😬
                </Alert>
              </Form>
            )}
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
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
                // label="If you want to remember your Login Panel ! "
                label="Keep me logged in 👇"
                size="small"
              />
            </Form>
            <Form>
              <Button type="submit" size="large" variant="contained">
                Login
              </Button>
            </Form>
          </form>
        </Wrapper>
      </FormContainer>
      <ImageContainer>
        <img
          style={{ height: "100vh", width: "100%", objectFit: "none" }}
          // src="https://media.istockphoto.com/vectors/team-of-builders-and-industrial-workers-vector-id1312320486?b=1&k=20&m=1312320486&s=612x612&w=0&h=GRFuDujVEQOs1I2UI5DI7UaPtrM860hPNXP8sZCN2c8="
          src="https://prod-upp-image-read.ft.com/e94129d6-2c41-11e3-8b20-00144feab7de"
          // src="https://img.freepik.com/free-vector/engineers-standing-near-big-monitor-with-buildings-project-crane-screen-flat-vector-illustration-construction-engineering_74855-8349.jpg?w=2000"
        />
      </ImageContainer>
    </Container>
  );
};
