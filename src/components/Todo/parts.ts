import styled from "styled-components";
import { globalColors } from "../../GlobalStyles";

interface Theme {
  themeValue: boolean;
}

export const Container = styled.section`
  display: flex;
  overflow: auto;
  gap: 2rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Task = styled.li<Theme>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 88px;
  width: 280px;
  background-color: ${({ themeValue }) =>
    themeValue
      ? globalColors.lightThemeSecondary
      : globalColors.darkThemeSecondary};
  margin: 1rem 0;
  padding: 1rem;
  box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
  border-radius: 8px;
  p {
    :nth-child(1) {
      color: ${({ themeValue }) => (themeValue ? "black" : "white")};

      letter-spacing: 0.1rem;
      margin-bottom: 0.5rem;
    }
    :nth-child(2) {
      color: ${({ themeValue }) =>
        themeValue ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"};
      font-size: 0.8rem;
    }
  }
`;

export const KindTodo = styled.div<Theme>`
  display: flex;
  align-items: center;
  gap: 10px;
  div {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: green;
  }

  p {
    color: ${({ themeValue }) =>
      themeValue ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"};
  }
`;
