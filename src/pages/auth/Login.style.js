import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-image: url(https://images.pond5.com/industrial-production-plant-tata-steel-footage-086764102_prevstill.jpeg);
  background-size: cover;
  filter: blur(0px);
  background-color: rgba(0, 0, 0, 0.5);
  background-repeat: no-repeat;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -99;
`;

export const FormContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: auto 0.5em;
  background-image: linear-gradient(
    rgb(248, 248, 255, 0.5),
    rgb(56, 160, 223, 0.3)
  );
  max-width: 400px;
  width: 100%;
  padding: 0.8em 0;
  border-radius: 0;

  z-index: 999;

  @media (min-width: 380px) {
    margin: auto;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;

  form {
    width: 100%;
    padding: 0.5em;
  }
`;

export const Logo = styled.img`
  height: 22vh;
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
  margin-bottom: 15px;

  & > * {
    width: 100%;
  }

  /* Change the white text autofill to any color */
  & input:-webkit-autofill,
  & input:-webkit-autofill:hover,
  & input:-webkit-autofill:focus,
  & input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgba(55, 198, 255, 0.8) inset !important;
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
