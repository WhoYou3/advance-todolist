import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { usersRef } from "../../App";
import * as P from "./parts";
import { GiPadlock } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";
import { UserTasksData, Board } from "../../types";

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
  const navigate = useNavigate();

  const addNewUserToFirebase = async (id: string) => {
    await setDoc(doc(usersRef, id), {
      id,
      boards: [],
    });
  };

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
      await context!.signUp(emailValue!, passwordValue!);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };
  if (context?.currentUser) {
    addNewUserToFirebase(context.currentUser.uid);
    sessionStorage.setItem("id", context.currentUser.uid);
    navigate(`/${context.currentUser.uid}`);
  }

  return (
    <P.Wrapper>
      <h2>Registration</h2>
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
            id="singup-password"
          ></input>
          <label id="singup-password">Password</label>
          <GiPadlock />
        </P.InputBox>
        <P.InputBox>
          <input
            ref={repeatPassword}
            required
            data-testid="repeat-password"
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
