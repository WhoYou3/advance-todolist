import * as P from "./parts";
import { GiPadlock } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";

interface Props {
  kindOfFormHandler: () => void;
}

const RegisterForm: React.FC<Props> = ({ kindOfFormHandler }) => {
  return (
    <P.Wrapper>
      <h2>Registration</h2>
      <P.Form>
        <P.InputBox>
          <input required type="text" id="login"></input>
          <label id="login">Login</label>
          <BsFillPersonFill />
        </P.InputBox>
        <P.InputBox>
          <input required type="password" id="singup-password"></input>
          <label id="singup-password">Password</label>
          <GiPadlock />
        </P.InputBox>
        <P.InputBox>
          <input required type="password" id="repeat-password"></input>
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
