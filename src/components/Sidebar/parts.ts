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
  display: flex;
  flex-direction: column;
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

export const ImageContainer = styled.div`
  padding: 2rem 3rem;
`;
export const WrapperBoards = styled.div`
  margin-top: 2rem;

  div.selected {
    font-weight: bold;
    color: white;
    width: 90%;
    padding: 10px;
    background-color: ${globalColors.buttonPrimary};
    border-radius: 0px 100px 100px 0px;
  }

  p {
    color: ${globalColors.textPrimary};
    font-size: 0.7rem;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 1rem 0;
    text-align: center;
  }

  div.selected li,
  div.selected li svg {
    color: white;
  }

  ul {
    display: flex;
    flex-direction: column;
  }
  li {
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    position: relative;

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
