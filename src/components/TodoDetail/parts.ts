import styled from "styled-components";
import { globalColors } from "../../GlobalStyles";

interface Theme {
  themeValue: boolean;
}

interface Checkbox {
  isChecked: boolean;
}

export const Wrapper = styled.div<Theme>`
  height: 557px;
  width: 343px;
  cursor: default;
  background-color: ${({ themeValue }) =>
    themeValue
      ? globalColors.lightThemeSecondary
      : globalColors.darkThemeSecondary};
  padding: 2rem 1rem;
  border-radius: 5px;
  position: relative;

  h3 {
    color: ${({ themeValue }) => (themeValue ? "black" : "white")};
    font-size: 2rem;
  }
  p {
    letter-spacing: 1.2px;
    margin: 1rem 0;
    font-size: 1rem;
    color: ${({ themeValue }) =>
      themeValue ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"};
    span {
      font-weight: bold;
      color: ${({ themeValue }) => (themeValue ? "black" : "white")};
    }
  }
`;

export const SubtaskWrapper = styled.div<Theme & Checkbox>`
  display: flex;
  padding: 0rem 1rem;
  border-radius: 8px;
  gap: 20px;
  margin: 1rem 0;
  background-color: ${({ themeValue }) =>
    themeValue
      ? globalColors.lightThemePrimary
      : globalColors.darkThemePrimary};
  p {
    text-decoration: ${({ isChecked }) => (isChecked ? "line-through" : "")};
  }
`;

export const ButtonsWrapper = styled.div`
  position: fixed;
  width: 343px;
  display: flex;
  justify-content: space-between;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);

  button {
    cursor: pointer;
    width: 100px;
    height: 48px;
    border-radius: 24px;
    background-color: rgb(99, 95, 199);
    color: white;
    :nth-child(1) {
      background-color: pink;
      color: black;
    }
    :nth-child(3) {
      background-color: red;
    }
    :disabled {
      opacity: 0.1;
      cursor: default;
    }
  }
`;
