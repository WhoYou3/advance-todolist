import styled from "styled-components";
import { Theme } from "../../types";
import { globalColors } from "../../GlobalStyles";

export const Shadow = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form<Theme>`
  margin: 1rem;
  padding: 2rem;
  z-index: 10;
  color: white;
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  background-color: ${({ themeValue }) =>
    themeValue
      ? globalColors.lightThemeSecondary
      : globalColors.darkThemeSecondary};

  h3 {
    font-size: 1.3rem;
  }

  input {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    background-color: transparent;
    border: ${({ themeValue }) =>
      themeValue
        ? "1px solid rgba(130, 143, 163, 0.25);"
        : "1px solid rgba(130, 143, 163, 0.25);"};
    padding: 0 1rem;
  }

  label {
    margin-top: 1rem;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }

  svg {
    cursor: pointer;
  }

  textarea {
    background-color: transparent;
    padding: 1rem;
    border: ${({ themeValue }) =>
      themeValue
        ? "1px solid rgba(130, 143, 163, 0.25);"
        : "1px solid rgba(130, 143, 163, 0.25);"};
  }

  button {
    border-radius: 20px;
    height: 40px;
    font-weight: bold;
    margin-top: 1rem;
    cursor: pointer;
  }

  button:nth-of-type(1) {
    background-color: ${({ themeValue }) =>
      themeValue ? globalColors.buttonSecondary : "#FFF"};
  }
  button:nth-of-type(2) {
    background-color: ${({ themeValue }) =>
      themeValue ? globalColors.lightThemePrimary : globalColors.buttonPrimary};
    color: white;
  }
`;

export const CloseIcon = styled.div`
  position: absolute;
  right: 30px;
  font-size: 2rem;
  color: black;
`;

export const WrapperSubtasks = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
  svg {
    font-size: 1.2rem;
  }
`;
