import { LoginForm, RegisterForm } from "../components";
import styled from "styled-components";
import backgroundImage from "../assets/background-login.jpg";
import { useState } from "react";
const Login: React.FC = () => {
  const [kindForm, setKindForm] = useState<boolean>(true);

  const kindOfForm = () => {
    setKindForm((prev) => !prev);
  };
  return (
    <Background>
      {kindForm ? (
        <LoginForm kindOfFormHandler={kindOfForm} />
      ) : (
        <RegisterForm kindOfFormHandler={kindOfForm} />
      )}
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
