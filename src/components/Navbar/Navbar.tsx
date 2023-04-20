import React, { useState } from "react";
import Switch from "react-switch";
import { IoMdArrowDropdown } from "react-icons/Io";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { BiPlus } from "react-icons/Bi";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo-dark.svg";
import * as P from "./parts";

const Navbar = () => {
  const context = useAuth();
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const theme = context?.theme;

  const toggleSwitch = () => {
    context?.setTheme((prev) => !prev);
    console.log(context?.theme);
  };

  const toggleMenu = () => {
    setIsMenu((prev) => !prev);
  };
  return (
    <P.Navbar themeValue={theme!}>
      <img src={logo}></img>
      <P.MiniLogo>
        <div></div>
        <div></div>
        <div></div>
      </P.MiniLogo>
      <P.Navigate>
        <P.Wrapper isMenu={isMenu} onClick={toggleMenu}>
          <h3>Title</h3>
          <IoMdArrowDropdown />
        </P.Wrapper>
        {isMenu ? (
          <P.Menu>
            <li>test</li>
            <div>
              <BsMoonFill />
              <Switch onChange={toggleSwitch} checked={context!.theme} />
              <BsSun />
            </div>
          </P.Menu>
        ) : null}
      </P.Navigate>
      <h2>Title</h2>
      <P.AddTask themeValue={theme!}>
        <button>
          <p>Add new task!</p>
          <BiPlus />
        </button>
      </P.AddTask>
    </P.Navbar>
  );
};

export default Navbar;
