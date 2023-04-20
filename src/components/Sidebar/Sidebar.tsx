import React, { useState } from "react";
import logo from "../../assets/logo-dark.svg";
import Switch from "react-switch";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import * as P from "./parts";

const Sidebar = () => {
  const context = useAuth();
  const theme = context?.theme;
  const [isSidebar, setIsSidebar] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebar((prev) => !prev);
  };

  const toggleSwitch = () => {
    context?.setTheme((prev) => !prev);
  };
  console.log(theme);

  return (
    <P.Sidebar sidebarValue={isSidebar} themeValue={theme!}>
      <img src={logo}></img>
      <p>ALL BOARDS</p>
      <ul>
        <li>test</li>
      </ul>
      <div>
        <BsMoonFill />
        <Switch onChange={toggleSwitch} checked={context!.theme} />
        <BsSun />
      </div>
      <P.IconEye onClick={toggleSidebar}>
        <AiOutlineEye />
      </P.IconEye>
    </P.Sidebar>
  );
};

export default Sidebar;
