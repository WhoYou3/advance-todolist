import { createGlobalStyle } from "styled-components";

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
}

a {
  text-decoration: none;
}

ul, ol {
   list-style: none;
}
`;
