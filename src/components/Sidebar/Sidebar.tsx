import React, { useState } from "react";
import logo from "../../assets/logo-dark.svg";
import Switch from "react-switch";
import { TbBooks } from "react-icons/tb";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { Board } from "../../types";
import * as P from "./parts";

const Sidebar = () => {
  const context = useAuth();
  const theme = context?.theme;
  const [isSidebar, setIsSidebar] = useState<boolean>(true);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

  const handleBoardClick = (boardTitle: string) => {
    setSelectedBoard(boardTitle);
  };

  const toggleSidebar = () => {
    setIsSidebar((prev) => !prev);
  };

  const toggleSwitch = () => {
    context?.setTheme((prev) => !prev);
  };

  const openBoardForm = () => {
    context?.openBoard();
  };

  const setBoard = (board: Board) => {
    context?.fetchBoardData(board);
  };

  return (
    <P.Sidebar sidebarValue={isSidebar} themeValue={theme!}>
      <P.ImageContainer>
        <img src={logo}></img>
      </P.ImageContainer>
      <P.WrapperBoards>
        <p data-testid="count-borders">
          ALL BOARDS ({context?.currentUserData?.boards?.length})
        </p>
        <ul data-testid="borders-list">
          {context?.currentUserData?.boards?.map((board, index) => (
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
          <li onClick={openBoardForm}>
            <TbBooks color="#635FC7" />
            <p color="#635FC7" data-testid="add-new-border">
              Add New Board
            </p>
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
