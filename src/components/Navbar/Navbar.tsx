import React, { useState } from "react";
import Switch from "react-switch";
import { IoMdArrowDropdown } from "react-icons/Io";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { TbBooks } from "react-icons/tb";
import { BiPlus } from "react-icons/Bi";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo-dark.svg";
import { ToggleContainer, WrapperBoards } from "../Sidebar/parts";
import { Board } from "../../types";
import * as P from "./parts";

const Navbar = () => {
  const context = useAuth();
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const theme = context?.theme;
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const handleBoardClick = (boardTitle: string) => {
    setSelectedBoard(boardTitle);
  };

  const openNewTask = () => {
    context?.toggleTaskForm();
  };

  const toggleSwitch = () => {
    context?.setTheme((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenu((prev) => !prev);
  };

  const setBoard = (board: Board) => {
    context?.fetchBoardData(board);
  };

  const logout = () => {
    context?.logout();
    sessionStorage.clear();
    location.reload();
    console.log("ale dzaja");
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
          <h3>{context?.boardData?.title}</h3>
          <IoMdArrowDropdown />
        </P.Wrapper>
        {isMenu ? (
          <P.Menu isMenu={isMenu} themeValue={theme!}>
            <WrapperBoards>
              <P.IconContainer onClick={() => setIsMenu(false)}>
                <AiOutlineClose />
              </P.IconContainer>
              <ul>
                <li
                  onClick={() => {
                    context?.openBoard();
                    setIsMenu(false);
                  }}
                >
                  <TbBooks color="#635FC7" />
                  <p color="#635FC7">Add New Board</p>
                </li>
                {context?.currentUserData?.boards?.map((board) => (
                  <div
                    key={board.title}
                    onClick={() => {
                      handleBoardClick(board.title!);
                      setBoard(board);
                    }}
                    className={selectedBoard === board.title ? "selected" : ""}
                  >
                    <li key={board.title}>
                      <TbBooks />
                      {board.title}
                    </li>
                  </div>
                ))}
              </ul>
            </WrapperBoards>
            <ToggleContainer themeValue={theme!}>
              <BsMoonFill />
              <Switch onChange={toggleSwitch} checked={context!.theme} />
              <BsSun />
            </ToggleContainer>
          </P.Menu>
        ) : null}
      </P.Navigate>
      <h2>{context?.boardData?.title}</h2>
      <P.AddTask themeValue={theme!}>
        <button
          onClick={openNewTask}
          disabled={context?.boardData === null ? true : false}
        >
          <p>Add new task!</p>
          <BiPlus />
        </button>
      </P.AddTask>
      <P.Logout>
        <button onClick={() => logout()}>Logout</button>
      </P.Logout>
    </P.Navbar>
  );
};

export default Navbar;
