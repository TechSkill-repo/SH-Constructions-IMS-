import styled from "styled-components";
import formBg from "./formBg.jpg";

const media = {
  desktop: "@media (max-width: 1024px)",
  tablet: "@media (max-width: 920px)",
  tabletSmall: "@media (max-width: 768px)",
  mobile: "@media (max-width: 425px)",
};

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormContainer = styled.div`
  align-items: center !important;
  text-align: center;
  height: 100vh;
  width: 50%;
`;

export const Head = styled.h1`
  margin-top: 8%;
  padding: 0 0 0 12%;
  color: #4782da;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;
export const Head1 = styled.h1`
  padding: 0 0 0 12%;
  color: #1769aa;
  font-size: 35px;
  font-weight: 900 !important;
  font-family: Arial, Helvetica, sans-serif;
`;

export const Paragraph = styled.p`
  padding: 2% 0 3% 12%;
  color: gray;
  width: 55%;
  margin: 0 auto;
  font-weight: 200 !important;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
`;

export const Form = styled.div`
  text-align: center;
  padding: 4% 0 0 12%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
`;

export const ImageContainer = styled.div`
  width: 50%;
  background: rgb(255, 255, 255);
`;
