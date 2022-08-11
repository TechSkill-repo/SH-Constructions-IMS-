import styled from "styled-components";
import formBg from "./formBg.jpg";

const media = {
    desktop: "@media (max-width: 1024px)",
    tablet: "@media (max-width: 920px)",
    tabletSmall: "@media (max-width: 768px)",
    mobile: "@media (max-width: 425px)",
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #cbc3e3;
  
  .wrapper {
      display: flex;
      height: 85vh;
      width: 80vw;
      max-width: 1020px;
      margin: auto;
      border-radius: 0.5em;
    
    ${media.desktop} {
        width: 90vw;
    }
    
    ${media.tabletSmall} {
        flex-direction: column-reverse;
    }
    
    .formContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        width: 60%;
        height: 100%;
        border-radius: inherit;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;

        ${media.tabletSmall} {
            border-top-left-radius: 0;
            border-bottom-right-radius: inherit;
        }

        ${media.tabletSmall} {
            padding: 1em;
        }
        
        .formWrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            height: 80%;

            ${media.tabletSmall} {
                height: 100%;
            }
        }
        

        ${media.tablet} {
            width: 50%;
        }

        ${media.tabletSmall} {
            width: 100%;
        }

        .header {
            width: fit-content;
        }

        h1.logo {
            font-size: 1.2rem;
            margin-bottom: 1em;
            color: #5d76cb;
            letter-spacing: 1.2px;
        }

        h1.title {
            font-size: 2.1rem;
            letter-spacing: 3px;
        }
    }

    div.formBg {
        height: 100%;
        width: 40%;
        background: url(${formBg}) 0 0 / cover;
        display: flex;
        padding: 2em;
        border-radius: inherit;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        
        ${media.tabletSmall} {
            border-top-left-radius: inherit;
            border-bottom-right-radius: 0;
        }
    
    ${media.tablet} {
      width: 50%;
    }

    ${media.tabletSmall} {
      width: 100%;
    }
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: fit-content;

  ${media.tablet} {
    padding: 1em;
  }

  ${media.tabletSmall} {
    margin: auto;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    > button {
        margin-top: 0;
    }
  }

  button {
      height: 2.5em;
      border-radius: 0.5em;
      margin-top: 1em;
      border: 0;
      cursor: pointer;
    }
    
    .logInBtn {
        background: #5d76cb;
        color: white;
        font-weight: 500;
        letter-spacing: 0.8px;
    }

  p {
        margin-top: 1em;
    }
`;
