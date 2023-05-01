import styled from "styled-components";
import { globalColors } from "../../GlobalStyles";
import { Theme } from "../../types";

interface Props {
  isMenu: boolean;
}

export const Navbar = styled.nav<Theme>`
  height: 64px;
  display: flex;
  padding: 1rem;
  background-color: ${({ themeValue }) =>
    themeValue
      ? globalColors.lightThemeSecondary
      : globalColors.darkThemeSecondary};
  border-bottom: ${({ themeValue }) =>
    themeValue
      ? "1px rgba(0,0,0, 0.3) solid"
      : "1px rgba(255, 255, 255, 0.3) solid"};

  img {
    display: none;
  }

  h2 {
    display: none;
  }

  @media screen and (min-width: 820px) {
    height: 82px;
    padding: 1rem 3rem;
    align-items: center;

    img {
      display: block;
      height: 25px;
    }

    h2 {
      display: block;
      margin: auto;
    }
  }
`;

export const MiniLogo = styled.div`
  display: flex;
  gap: 2px;
  div:nth-child(1) {
    background: red;
    height: 100%;
    width: 6px;
    border-radius: 10px;
    background-color: #635fc7;
  }
  div:nth-child(2) {
    background: red;
    height: 100%;
    width: 6px;
    border-radius: 10px;
    background-color: #635fc7;
    opacity: 0.8;
  }
  div:nth-child(3) {
    background: red;
    height: 100%;
    width: 6px;
    border-radius: 10px;
    background-color: #635fc7;
    opacity: 0.6;
  }

  @media screen and (min-width: 820px) {
    display: none;
  }
`;

export const Navigate = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  gap: 10px;
  cursor: pointer;
  position: relative;

  @media screen and (min-width: 820px) {
    display: none;
  }
`;

export const IconContainer = styled.div`
  svg {
    position: absolute;
    right: 50%;
    transform: right(-50%);
    top: 10px;
    font-size: 1.5rem;
  }
`;
export const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    transition: transform 0.5s ease;
    font-size: 1.2rem;
    transform: ${({ isMenu }) => (isMenu ? "rotate(180deg)" : "none")};
  }
`;

export const Menu = styled.div<Theme & Props>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 264px;
  height: 322px;
  top: 50px;
  left: 0px;
  z-index: 2;
  background: ${({ themeValue }) =>
    themeValue
      ? globalColors.lightThemeSecondary
      : globalColors.darkThemeSecondary};
  box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
  border-radius: 8px;

  transition: opacity 1s ease-in-out;
  animation: ${({ isMenu }) => (isMenu ? "showOut" : "showIn")} 0.3s ease-in-out;
  overflow-y: scroll;

  @keyframes showIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const AddTask = styled.div<Theme>`
  margin-left: auto;
  button {
    cursor: pointer;
    height: 32px;
    width: 48px;
    background: ${globalColors.buttonPrimary};
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    :disabled {
      opacity: 0.5;
      position: relative;
      cursor: default;
      :hover {
        ::before {
          content: "choose or add now border";
          position: absolute;
          left: 0;
          transform: translateX(-100%);
          color: black;
          font-size: 1rem;
          font-weight: bold;
        }
      }
    }
    @media screen and (min-width: 820px) {
      height: 48px;
      width: 164px;
    }

    p {
      display: none;

      @media screen and (min-width: 820px) {
        display: block;
        font-size: 1.1rem;
        color: white;
      }
    }
  }

  svg {
    font-size: 1.5rem;
    color: white;
  }
`;

export const Logout = styled.div`
  margin-left: 20px;
  button {
    cursor: pointer;
    height: 32px;
    width: 48px;
    background: ${globalColors.buttonPrimary};
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 1rem 2rem;
  }
`;
