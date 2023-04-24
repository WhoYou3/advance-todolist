import React, { useState } from "react";
import * as P from "./parts";
import { AiOutlineClose } from "react-icons/ai";
import { Shadow } from "../AddNewTask/parts";
import { useAuth } from "../../context/AuthContext";

interface Props {
  title: string;
  description: string;
  subtasks: string[];
}

interface SubtasksWithCheckbox {
  text: string;
  isCheck: boolean;
}

const TodoDetail: React.FC<Props> = ({ title, description, subtasks }) => {
  const context = useAuth();
  const theme = context?.theme;
  const [checkSubtasks, setCheckSubtasks] = useState([]);

  return (
    <Shadow>
      <AiOutlineClose onClick={() => context?.closeTodoDetail()} />
      <P.Wrapper themeValue={theme!}>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
          <span>Subtasks (0 of {subtasks.length})</span>
        </p>
        {subtasks.map((subtask, index) => (
          <P.SubtaskWrapper themeValue={theme!} key={index}>
            <input type="checkbox"></input>
            <p>{subtask}</p>
          </P.SubtaskWrapper>
        ))}
        <P.ButtonsWrapper>
          <button>Add to "TODO"</button>
          <button>Add to "PENDING"</button>
          <button>Add to "DONE"</button>
        </P.ButtonsWrapper>
      </P.Wrapper>
    </Shadow>
  );
};

export default TodoDetail;
