import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as P from "./parts";
import { GiPadlock } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";
interface Props {
  kindOfFormHandler: () => void;
}

const LoginForm: React.FC<Props> = ({ kindOfFormHandler }) => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);
  const context = useAuth();
  const navigate = useNavigate();
  console.log(context?.currentUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailValue = email.current?.value;
    const passwordValue = password.current?.value;

    try {
      setError("");
      setLoading(true);
      await context?.login(emailValue!, passwordValue!);
      navigate(`/${context?.currentUser?.uid}`);
      sessionStorage.setItem("id", `${context?.currentUser?.uid}`);
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };

  return (
    <P.Wrapper>
      <h2>Login</h2>
      <P.Form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <P.InputBox>
          <input ref={email} required type="email" id="email"></input>
          <label id="email">Email</label>
          <BsFillPersonFill />
        </P.InputBox>
        <P.InputBox>
          <input
            ref={password}
            required
            type="password"
            id="login-password"
          ></input>
          <label id="login-password">Password</label>
          <GiPadlock />
        </P.InputBox>
        <button type="submit">SUBMIT</button>
        <p>
          Dont have account ?{" "}
          <span onClick={kindOfFormHandler}>Register now!</span>
        </p>
      </P.Form>
    </P.Wrapper>
  );
};

export default LoginForm;
