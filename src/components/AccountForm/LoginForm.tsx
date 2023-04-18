import * as P from "./parts";
import { GiPadlock } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";
interface Props {
  kindOfFormHandler: () => void;
}

const LoginForm: React.FC<Props> = ({ kindOfFormHandler }) => {
  return (
    <P.Wrapper>
      <h2>Login</h2>
      <P.Form>
        <P.InputBox>
          <input required type="text" id="login"></input>
          <label id="login">Login</label>
          <BsFillPersonFill />
        </P.InputBox>
        <P.InputBox>
          <input required type="password" id="password"></input>
          <label id="password">Password</label>
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
