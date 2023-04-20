import styled from "styled-components";
import { globalColors } from "../../GlobalStyles";
import { Theme } from "../../types";

interface SidebarProps {
  sidebarValue: boolean;
}

export const Sidebar = styled.aside<Theme & SidebarProps>`
  width: 300px;
  height: 100svh;
  position: absolute;
  transition: transform 0.5s ease-out;
  transform: ${({ sidebarValue }) =>
    sidebarValue ? "translateX(0)" : "translateX(-100%)"};

  top: 0;
  border: 1px blue solid;
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  border-right: ${({ themeValue }) =>
    themeValue
      ? "1px rgba(0,0,0, 0.3) solid"
      : "1px rgba(255, 255, 255, 0.3) solid"};

  background-color: ${({ themeValue }) =>
    themeValue
      ? globalColors.lightThemeSecondary
      : globalColors.darkThemeSecondary};

  img {
    height: 25px;
  }
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

export const WrapperBoards = styled.div`
  margin-top: 2rem;

  p {
    color: ${globalColors.textPrimary};
    font-size: 0.7rem;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 1rem 0;
  }

  li {
    display: flex;
    align-items: center;
    position: relative;
    margin: 1rem 0;
    color: ${globalColors.textPrimary};
    font-size: 1.1rem;
    cursor: pointer;

    svg {
      color: ${globalColors.textPrimary};
      margin-right: 1rem;
      font-size: 1.3rem;
    }
  }
`;

export const IconEye = styled.div`
  position: absolute;
  right: 0;
  bottom: 100px;
  transform: translateX(56px);
  height: 48px;
  width: 56px;
  background: ${globalColors.buttonPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  cursor: pointer;
  :hover {
    background-color: ${globalColors.buttonSecondary};
  }
  svg {
    font-size: 1.5rem;
    color: white;
  }
`;

export const ToggleContainer = styled.div<Theme>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: auto;
  padding: 1rem 0;
  gap: 10px;
  height: 48px;
  width: 100%;
  background-color: ${({ themeValue }) =>
    themeValue
      ? globalColors.lightThemePrimary
      : globalColors.darkThemePrimary};

  svg {
    font-size: 1.1rem;
    color: ${({ themeValue }) =>
      themeValue ? "black" : globalColors.textPrimary};
  }
`;
