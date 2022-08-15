import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  
  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Logo = styled.img`
  height: 25vh;
  width: 100%;
  object-fit: contain;
`;

export const Head = styled.h1`
  color: #1769aa;
  font-size: 1.7em;
  font-weight: 900 !important;
  font-family: Arial, Helvetica, sans-serif;
  
  @media (min-width: 330px) {
    font-size: 2em;
  }

  @media (min-width: 420px) {
    font-size: 2.2em;
  }
`;

export const Paragraph = styled.p`
  max-width: 450px;
  padding: 0 0.5em;
  margin: 1em auto 1.5em;
  color: gray;
  font-size: 0.875em;
  font-weight: 200 !important;
  font-family: Arial, Helvetica, sans-serif;
`;

export const Form = styled.div`
  display: flex;
  max-width: 450px;
  width: 90%;
  margin: 1em auto;

  & > * {
    width:100%;
  }
`;

export const ImageContainer = styled.div`
  display: none;
  background: rgb(255, 255, 255);

  @media (min-width: 768px) {
    display: block;
    width: 50%;
  }
`;
