import { LoginForm, RegisterForm } from "../components";
import styled from "styled-components";
import backgroundImage from "../assets/background-login.jpg";
const Login = () => {
  return (
    <Background>
      <RegisterForm />
    </Background>
  );
};

export const Background = styled.div`
  height: 100svh;
  width: 100%;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Login;
