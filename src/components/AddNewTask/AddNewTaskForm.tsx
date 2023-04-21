import React, { useRef, useState } from "react";
import { usersRef } from "../../App";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineClose } from "react-icons/ai";
import { Task } from "../../types";
import * as P from "./parts";

const AddNewTaskForm: React.FC = () => {
  const context = useAuth();
  const theme = context?.theme;
  const [subtasks, setSubtasks] = useState(["", ""]);
  const [task, setTask] = useState<Task | null>(null);
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const subtaskRefs = useRef<Array<HTMLInputElement | null>>([]);

  const addSubtask = () => {
    if (subtasks.length < 8) setSubtasks((prev) => [...prev, ""]);
  };
  const setLocalTask = () => {
    setTask((prevState) => {
      console.log("dodaje");

      const updatedTask = {
        ...prevState,
        title: title.current?.value,
        description: description.current?.value,
        subTasks: subtaskRefs.current.map(
          (subtaskRef) => subtaskRef?.value || ""
        ),
      } as Task;

      setToBoard(updatedTask); // Wywołanie funkcji test() z aktualną wartością task
      return updatedTask;
    });
  };

  const setToBoard = async (task: Task) => {
    const userDocRef = doc(usersRef, context?.currentUser?.uid);
    context!.setBoardTask(task);
    const boardIndex = context?.currentUserData?.boards?.findIndex(
      (board) => context.boardData?.title === board.title
    );
    if (boardIndex !== -1) {
      const boardDocSnapshot = await getDoc(userDocRef);
      const boardData = boardDocSnapshot.data();
      boardData!.boards[boardIndex!].tasks.notStartYetTasks = [task];
      await updateDoc(userDocRef, boardData);
    }
    context?.toggleTaskForm();
  };

  return (
    <P.Shadow>
      <P.Form
        onSubmit={(e) => {
          e.preventDefault();
          setLocalTask();
        }}
        themeValue={theme!}
      >
        <P.CloseIcon onClick={context?.toggleTaskForm}>
          <AiOutlineClose />
        </P.CloseIcon>
        <h3>Add new task</h3>
        <label id="Title">Title</label>
        <input ref={title} id="Title" type="text"></input>
        <label id="Description">Description</label>
        <textarea ref={description} id="Description"></textarea>
        <label id="subtasks">Subtasks</label>
        {subtasks.map((subtask, index) => (
          <P.WrapperSubtasks key={index}>
            <input
              ref={(el) => (subtaskRefs.current[index] = el)}
              id="subtasks"
            ></input>
            <AiOutlineClose />
          </P.WrapperSubtasks>
        ))}

        <button
          disabled={subtasks.length === 8 ? true : false}
          onClick={(e) => {
            e.preventDefault();
            addSubtask();
          }}
        >
          Add New Subtask
        </button>
        <label>Status</label>
        <button type="submit">Create Task</button>
      </P.Form>
    </P.Shadow>
  );
};

export default AddNewTaskForm;
