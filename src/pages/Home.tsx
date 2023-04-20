import React, { useEffect } from "react";
import { getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { fetchUserData } from "../App";
import { Navbar, Sidebar } from "../components";
import styled from "styled-components";
import { globalColors } from "../GlobalStyles";

const Home = () => {
  const context = useAuth();
  const theme = context?.theme;

  useEffect(() => {
    const test = async () => {
      const data = fetchUserData(context!.currentUser!.uid);
      const userData = await getDoc(data);
      console.log(userData.id);
    };
    test();
  }, []);
  return (
    <Background themeValue={theme!}>
      <Navbar></Navbar>
      <Sidebar />
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
