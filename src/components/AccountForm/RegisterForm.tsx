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
    //
    // const newBoard: UserTasksData =
    //  = {

    //   title: undefined,
    //   tasks: {
    //     notStartYetTasks: [
    //       {
    //         title: null,
    //         description: null,
    //         subTasks: [],
    //       },
    //     ],
    //     pendingTasks: [
    //       {
    //         title: null,
    //         description: null,
    //         subTasks: [],
    //       },
    //     ],
    //     doneTasks: [
    //       {
    //         title: null,
    //         description: null,
    //         subTasks: [],
    //       },
    //     ],
    //   },
    // };
    await setDoc(doc(usersRef, id), {
      id,
      boards: [],
    });
    console.log("add new user");
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
      // await addNewUserToFirebase("test");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };
  console.log(context?.currentUser);
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
