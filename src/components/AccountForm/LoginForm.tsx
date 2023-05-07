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
  const [showLoginData, setShowLoginData] = useState<boolean>(false);
  const context = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailValue = email.current?.value;
    const passwordValue = password.current?.value;

    try {
      setError("");
      setLoading(true);
      await context?.login(emailValue!, passwordValue!);
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };
  if (context?.currentUser) {
    sessionStorage.setItem("id", context.currentUser.uid);
    navigate(`/${context.currentUser.uid}`);
  }

  return (
    <P.Wrapper
      onMouseLeave={() => setShowLoginData(false)}
      onMouseOver={() => setShowLoginData(true)}
    >
      <h2>Login</h2>
      <P.Form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <P.InputBox>
          <input
            data-testid="email"
            ref={email}
            required
            type="email"
            id="email"
          ></input>
          <label id="email">Email</label>
          <BsFillPersonFill />
        </P.InputBox>
        <P.InputBox>
          <input
            ref={password}
            required
            data-testid="password"
            type="password"
            id="login-password"
          ></input>
          <label id="login-password">Password</label>
          <GiPadlock />
        </P.InputBox>
        <button type="submit">SUBMIT</button>
        <p>
          Dont have account ?{" "}
          <span onClick={() => kindOfFormHandler()}>Register now!</span>
        </p>
      </P.Form>
      {showLoginData ? (
        <>
          <p>Example Email and Password</p>
          <p>Login: Przyklad123@gmail.com</p>
          <p>Hasło: przykladowe123</p>
        </>
      ) : null}
    </P.Wrapper>
  );
};

export default LoginForm;
