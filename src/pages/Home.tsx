import React, { useEffect } from "react";
import { getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Navbar, Sidebar, Todos } from "../components";
import styled from "styled-components";
import { globalColors } from "../GlobalStyles";

const Home = () => {
  const context = useAuth();
  const theme = context?.theme;

  return (
    <Background themeValue={theme!}>
      <Navbar></Navbar>
      <Sidebar />
      <Todos />
    </Background>
  );
};
interface Theme {
  themeValue: boolean;
}

export const Background = styled.div<Theme>`
  height: 100svh;
  width: 100%;
  background-color: ${({ themeValue }) =>
    themeValue
      ? globalColors.lightThemePrimary
      : globalColors.darkThemePrimary};
`;

export default Home;
