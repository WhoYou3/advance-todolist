import * as P from "./parts";
import { GiPadlock } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";

const RegisterForm: React.FC = () => {
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
          <input required type="password" id="password"></input>
          <label id="password">Password</label>
          <GiPadlock />
        </P.InputBox>
        <P.InputBox>
          <input required type="password" id="password"></input>
          <label id="password">Repeat Password</label>
          <GiPadlock />
        </P.InputBox>
        <button type="submit">REGISTER</button>
        <p>
          Already have an account ? <span>LOGIN</span>
        </p>
      </P.Form>
    </P.Wrapper>
  );
};

export default RegisterForm;
