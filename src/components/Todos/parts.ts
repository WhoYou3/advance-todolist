import styled from "styled-components";
import { globalColors } from "../../GlobalStyles";

export const Wrapper = styled.section`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 174px;
  height: 48px;
  border-radius: 24px;
  background-color: ${globalColors.buttonPrimary};
  color: white;
`;
