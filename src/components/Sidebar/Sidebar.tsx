import React, { useState } from "react";
import logo from "../../assets/logo-dark.svg";
import Switch from "react-switch";
import { TbBooks } from "react-icons/tb";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import * as P from "./parts";

const Sidebar = () => {
  const context = useAuth();
  const theme = context?.theme;
  const [isSidebar, setIsSidebar] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebar((prev) => !prev);
  };

  const toggleSwitch = () => {
    context?.setTheme((prev) => !prev);
  };

  const openBoardForm = () => {
    context?.openBoard();
  };

  console.log(context?.openBoardForm);

  return (
    <P.Sidebar sidebarValue={isSidebar} themeValue={theme!}>
      <img src={logo}></img>
      <P.WrapperBoards>
        <p>ALL BOARDS ({context?.currentUserData?.boards?.length})</p>
        <ul>
          {context?.currentUserData?.boards?.map((board) => (
            <li key={board.title}>
              <TbBooks />
              {board.title}
            </li>
          ))}
          <li onClick={openBoardForm}>
            <TbBooks color="#635FC7" />
            <p color="#635FC7">Add New Board</p>
          </li>
        </ul>
      </P.WrapperBoards>
      <P.ToggleContainer themeValue={theme!}>
        <BsMoonFill />
        <Switch onChange={toggleSwitch} checked={context!.theme} />
        <BsSun />
      </P.ToggleContainer>
      <P.IconEye onClick={toggleSidebar}>
        <AiOutlineEye />
      </P.IconEye>
    </P.Sidebar>
  );
};

export default Sidebar;
