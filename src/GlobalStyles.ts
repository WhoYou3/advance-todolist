import { createGlobalStyle } from "styled-components";

export const globalColors: any = {
  lightThemePrimary: "#E4EBFA",
  lightThemeSecondary: "#FFF",
  darkThemePrimary: "#20212C",
  darkThemeSecondary: "#2B2C37",
  buttonPrimary: "#635FC7",
  buttonSecondary: "#A8A4FF",
};

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  border: none;
}
body {
  height: 100%;
  width: 100%;
  font-family: 'Roboto', 'sans-serif';
  
}

a {
  text-decoration: none;
}

ul, ol {
   list-style: none;
}
`;
