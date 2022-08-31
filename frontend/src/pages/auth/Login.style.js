import styled from "styled-components";
import loginBg from "./login.webp";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-image: url(${() => loginBg});
  background-size: cover;
  background-repeat: no-repeat;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0.5em;
  background: rgba(55, 198, 255, 0.8);
  max-width: 360px;
  width: 100%;
  padding: 0.8em 0;
  border-radius: 0.45em;

  @media (min-width: 380px) {
    margin: auto; 
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  width: 100%;
  
  form {
    width: 100%;
    padding: 0.5em;
  }
`;

export const Logo = styled.img`
  height: 25vh;
  width: 100%;
  object-fit: contain;
`;

export const FormField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em auto;
  width: 75%;
  background: transparent;

  & > * {
    width: 100%;
  }

  /* Change the white text autofill to any color */
  & input:-webkit-autofill,
  & input:-webkit-autofill:hover, 
  &  input:-webkit-autofill:focus, 
  & input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px rgba(55,198,255,0.8) inset !important;
  }
`;

export const Links = styled.div`
  display: flex;
  justify-content: space-evenly;
  text-align: left;
  align-items: center;
  padding: 0.5em;
  margin: 0.8em auto 0.2em;
  color: #efefef;

  a {
    margin-right: 0.8em;
    padding-right: 0.5em;

    :not(:last-child) {
      border-right: 0.1em solid #efefef;
    }
  }
`;
