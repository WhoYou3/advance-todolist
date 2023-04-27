import React, { useState } from "react";
import * as P from "./parts";
import { AiOutlineClose } from "react-icons/ai";
import { Shadow } from "../AddNewTask/parts";
import { useAuth } from "../../context/AuthContext";
import { SubTask } from "../../types";
import { disableNetwork } from "firebase/firestore";

interface Props {
  title: string;
  description: string;
  subtasks: SubTask[];
}

interface SubtasksWithCheckbox {
  text: string;
  isCheck: boolean;
}

const TodoDetail: React.FC<Props> = ({ title, description, subtasks }) => {
  const context = useAuth();
  const theme = context?.theme;
  const [checkSubtasks, setCheckSubtasks] = useState<SubtasksWithCheckbox[]>(
    () => {
      return subtasks.map((subtask) => ({
        text: subtask.subtask,
        isCheck: subtask.done,
      }));
    }
  );

  const handleCheckboxChange = (index: number) => {
    setCheckSubtasks((prevSub) => {
      const newSubtasks = [...prevSub];
      newSubtasks[index].isCheck = !newSubtasks[index].isCheck;

      return newSubtasks;
    });
  };
  const checkIfAllSubtaskIsUndone = () => {
    const areAllUndone = checkSubtasks.every((value) => !value.isCheck);
    console.log("lipa");
    return areAllUndone;
  };

  const checkIfSubtaskIsStarted = () => {
    const areSubtaksIsStarted = checkSubtasks.some((value) => value.isCheck);
    const areSubtaskIsDone = checkSubtasks.every((value) => value.isCheck);
    if (areSubtaskIsDone) {
      return !areSubtaskIsDone;
    }
    return areSubtaksIsStarted;
  };

  const checkIfAllSubtaskIsDone = () => {
    const areSubtaskIsDone = checkSubtasks.every((value) => value.isCheck);
    return areSubtaskIsDone;
  };

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
          <P.SubtaskWrapper
            isChecked={checkSubtasks[index].isCheck}
            themeValue={theme!}
            key={index}
          >
            <input
              type="checkbox"
              onChange={() => {
                handleCheckboxChange(index);
              }}
            ></input>
            <p>{subtask.subtask}</p>
          </P.SubtaskWrapper>
        ))}
        <P.ButtonsWrapper>
          <button disabled={!checkIfAllSubtaskIsUndone()}>Add to "TODO"</button>
          <button disabled={!checkIfSubtaskIsStarted()}>
            Add to "PENDING"
          </button>
          <button disabled={!checkIfAllSubtaskIsDone()}>Add to "DONE"</button>
        </P.ButtonsWrapper>
      </P.Wrapper>
    </Shadow>
  );
};

export default TodoDetail;
