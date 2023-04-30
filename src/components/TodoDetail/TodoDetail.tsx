import React, { useState, useEffect } from "react";
import * as P from "./parts";
import { AiOutlineClose } from "react-icons/ai";
import { Shadow } from "../AddNewTask/parts";
import { useAuth } from "../../context/AuthContext";
import { Board, SubTask, Task } from "../../types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { usersRef } from "../../App";

// interface Task {
//   title: string;
//   description: string;
//   subtasks: SubTask[];
// }

const TodoDetail: React.FC<Task> = ({ title, description, subTasks }) => {
  const context = useAuth();
  const theme = context?.theme;
  const [checkSubtasks, setCheckSubtasks] = useState<SubTask[]>(() => {
    return subTasks.map((subtask) => ({
      subtask: subtask.subtask,
      done: subtask.done,
    }));
  });

  const [todoDetail, setTodoDetail] = useState<Task>({
    title: title,
    description: description,
    subTasks: checkSubtasks,
  });
  console.log(todoDetail);

  // useEffect(() => {
  //   context?.updateTask()
  // })
  // useEffect(() => {
  //   const getUserData = async () => {
  //     const userDocRef = doc(usersRef, context?.currentUser?.uid);
  //     const docSnap = await getDoc(userDocRef);
  //     if (docSnap.exists()) {
  //       const data = docSnap.data();
  //       const myBoard = data.boards.find((board:Board) => board.tasks. === 'My Board');
  //     }
  //   };
  //   getUserData();
  // }, []);

  const handleCheckboxChange = (index: number) => {
    setCheckSubtasks((prevSub) => {
      const newSubtasks = [...prevSub];
      newSubtasks[index].done = !newSubtasks[index].done;

      return newSubtasks;
    });
  };
  const checkIfAllSubtaskIsUndone = () => {
    const areAllUndone = checkSubtasks.every((value) => !value.done);
    return areAllUndone;
  };

  const checkIfSubtaskIsStarted = () => {
    const areSubtaksIsStarted = checkSubtasks.some((value) => value.done);
    const areSubtaskIsDone = checkSubtasks.every((value) => value.done);
    if (areSubtaskIsDone) {
      return !areSubtaskIsDone;
    }
    return areSubtaksIsStarted;
  };

  const checkIfAllSubtaskIsDone = () => {
    const areSubtaskIsDone = checkSubtasks.every((value) => value.done);
    return areSubtaskIsDone;
  };

  const updateSubtask = (subtask: SubTask[]) => {
    context?.updateTask(subtask);
  };
  const updateFirebaseToPending = async (task: Task) => {
    const userDocRef = doc(usersRef, context?.currentUser?.uid);
    const boardIndex = context?.currentUserData?.boards?.findIndex(
      (board) => context.boardData?.title === board.title
    );
    if (boardIndex !== -1) {
      const boardDocSnapshot = await getDoc(userDocRef);
      const boardData = boardDocSnapshot.data();
      if (
        boardData!.boards[boardIndex!].tasks.pendingTasks.some(
          (t: Task) => t.title === task.title
        )
      ) {
        const index = boardData!.boards[
          boardIndex!
        ].tasks.pendingTasks.findIndex((t: Task) => t.title === task.title);
        boardData!.boards[boardIndex!].tasks.pendingTasks.splice(
          index,
          1,
          task
        );
      } else {
        boardData!.boards[boardIndex!].tasks.pendingTasks.push(task);
      }

      boardData!.boards[boardIndex!].tasks.notStartYetTasks.splice(
        boardIndex,
        1
      );

      try {
        await updateDoc(userDocRef, boardData);
      } catch {}
      context?.closeTodoDetail();
    }
  };

  return (
    <Shadow>
      <AiOutlineClose onClick={() => context?.closeTodoDetail()} />
      <P.Wrapper themeValue={theme!}>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
          <span>Subtasks (0 of {subTasks.length})</span>
        </p>
        {subTasks.map((subtask, index) => (
          <P.SubtaskWrapper
            isChecked={checkSubtasks[index].done}
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
          <button
            disabled={!checkIfSubtaskIsStarted()}
            onClick={() => {
              updateSubtask(checkSubtasks);
              updateFirebaseToPending(context!.task!);
            }}
          >
            Add to "PENDING"
          </button>
          <button disabled={!checkIfAllSubtaskIsDone()}>Add to "DONE"</button>
        </P.ButtonsWrapper>
      </P.Wrapper>
    </Shadow>
  );
};

export default TodoDetail;
