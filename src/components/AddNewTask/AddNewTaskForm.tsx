import React from "react";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineClose } from "react-icons/ai";
import * as P from "./parts";

const AddNewTaskForm: React.FC = () => {
  const context = useAuth();
  const theme = context?.theme;
  return (
    <P.Shadow>
      <P.Form themeValue={theme!}>
        <P.CloseIcon onClick={context?.toggleTaskForm}>
          <AiOutlineClose />
        </P.CloseIcon>
        <h3>Add new task</h3>
        <label id="Title">Title</label>
        <input id="Title" type="text"></input>
        <label id="Description">Description</label>
        <textarea id="Description"></textarea>
        <label id="subtasks">Subtasks</label>
        <P.WrapperSubtasks>
          <input id="subtasks"></input>
          <AiOutlineClose />
        </P.WrapperSubtasks>
        <P.WrapperSubtasks>
          <input id="subtasks"></input>
          <AiOutlineClose />
        </P.WrapperSubtasks>

        <button>Add New Subtask</button>
        <label>Status</label>
        <button>Create Task</button>
      </P.Form>
    </P.Shadow>
  );
};

export default AddNewTaskForm;
