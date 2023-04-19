import { useRef, useState } from "react";
import { auth } from "../../App";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as P from "./parts";
import { GiPadlock } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";

interface Props {
  kindOfFormHandler: () => void;
}

const RegisterForm: React.FC<Props> = ({ kindOfFormHandler }) => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const repeatPassword = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);
  const context = useAuth();
  console.log(context?.currentUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailValue = email.current?.value;
    const passwordValue = password.current?.value;

    if (password.current?.value !== repeatPassword.current?.value) {
      return setError("Password do not match");
    }
    try {
      setError("");
      setLoading(true);
      await context?.signUp(emailValue!, passwordValue!);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  // const [errorMessage, setErrorMessage] = useState<String>("");
  // const navigate = useNavigate();

  // const signup = (email: string, password: string) => {
  //   return auth.createUserWithEmailAndPassword(email, password);
  // };

  // const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const userLogin = login.current?.value || "";
  //   const userPassword = password.current?.value || "";
  //   const userRepeatPassword = repeatPassword.current?.value || "";

  //   if (userPassword !== userRepeatPassword) {
  //     return setErrorMessage("Password dont match");
  //   }

  //   try {
  //     await signup(userLogin, userPassword);
  //     navigate("/");
  //   } catch {
  //     setErrorMessage("Failed create account");
  //   }
  // };
  return (
    <P.Wrapper>
      <h2>Registration</h2>
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
            id="singup-password"
          ></input>
          <label id="singup-password">Password</label>
          <GiPadlock />
        </P.InputBox>
        <P.InputBox>
          <input
            ref={repeatPassword}
            required
            type="password"
            id="repeat-password"
          ></input>
          <label id="repeat-password">Repeat Password</label>
          <GiPadlock />
        </P.InputBox>
        <button disabled={loading} type="submit">
          REGISTER
        </button>
        <p>
          Already have an account ?{" "}
          <span onClick={kindOfFormHandler}>LOGIN</span>
        </p>
      </P.Form>
    </P.Wrapper>
  );
};

export default RegisterForm;
