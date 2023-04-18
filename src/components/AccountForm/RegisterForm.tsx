import { useRef } from "react";
import { auth } from "../../App";
import * as P from "./parts";
import { GiPadlock } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";

interface Props {
  kindOfFormHandler: () => void;
}

const RegisterForm: React.FC<Props> = ({ kindOfFormHandler }) => {
  const login = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const repeatPassword = useRef<HTMLInputElement>(null);

  const signup = (email: string, password: string) => {
    console.log("test");
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const userLogin = login.current?.value || "";
    const userPassword = password.current?.value || "";
    console.log("testsss");
    try {
      await signup(userLogin, userPassword);
      console.log("dziala");
    } catch {
      new Error("Failed");
      console.log("dasdas");
    }
  };
  return (
    <P.Wrapper>
      <h2>Registration</h2>
      <P.Form onSubmit={handleSignup}>
        <P.InputBox>
          <input ref={login} required type="text" id="login"></input>
          <label id="login">Login</label>
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
        <button type="submit">REGISTER</button>
        <p>
          Already have an account ?{" "}
          <span onClick={kindOfFormHandler}>LOGIN</span>
        </p>
      </P.Form>
    </P.Wrapper>
  );
};

export default RegisterForm;
