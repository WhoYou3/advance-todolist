import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import * as P from "./parts";
import TodoDetail from "../TodoDetail/TodoDetail";
import { SubTask, Task } from "../../types";
import { doc, onSnapshot } from "firebase/firestore";
import { usersRef } from "../../App";

const Todo = () => {
  const [todoDetail, setTodoDetail] = useState<Task>({
    title: "",
    description: "",
    subTasks: [],
  });
  const context = useAuth();
  const theme = context?.theme;

  const setTask = (task: Task) => {
    context?.createTask(task);
  };

  const findBoard = () => {
    const data = context?.currentUserData?.boards?.find(
      (board) => board.title === context.boardData?.title
    );

    return data;
  };

  const howManySubtasksIsDone = (subtask: SubTask[]) => {
    let howManyDone = 0;
    subtask.map((el) => {
      if (el.done === true) {
        howManyDone++;
      }
    });
    return howManyDone;
  };
  const data = findBoard();

  return (
    <P.Container>
      <P.Wrapper>
        <P.KindTodo color="red" themeValue={theme!}>
          <div></div>
          <p>TODO ({data?.tasks?.notStartYetTasks.length})</p>
        </P.KindTodo>
        <ul>
          {data?.tasks?.notStartYetTasks?.map((el) => (
            <>
              <P.Task
                onClick={() => {
                  context!.openTodoDetail();
                  setTodoDetail((prev) => {
                    (prev.title = el.title),
                      (prev.description = el.description),
                      (prev.subTasks = el.subTasks);
                    return prev;
                  });
                  setTask(todoDetail);
                }}
                key={el.title}
                themeValue={theme!}
              >
                <p>{el.title}</p>
                <p>0 of {el.subTasks?.length} subtasks</p>
              </P.Task>
              {context!.isTodoDetail ? (
                <TodoDetail
                  title={todoDetail.title}
                  description={todoDetail.description}
                  subTasks={todoDetail.subTasks}
                />
              ) : null}
            </>
          ))}
        </ul>
      </P.Wrapper>
      <P.Wrapper>
        <P.KindTodo color="yellow" themeValue={theme!}>
          <div></div>
          <p>PENDING ({data?.tasks?.pendingTasks.length})</p>
        </P.KindTodo>
        <ul>
          {data?.tasks?.pendingTasks?.map((el) => (
            <>
              <P.Task
                onClick={() => {
                  context!.openTodoDetail();

                  setTodoDetail((prev) => {
                    (prev.title = el.title),
                      (prev.description = el.description),
                      (prev.subTasks = el.subTasks);
                    return prev;
                  });
                  setTask(todoDetail);
                }}
                key={el.title}
                themeValue={theme!}
              >
                <p>{el.title}</p>
                <p>
                  {howManySubtasksIsDone(el.subTasks)} of {el.subTasks?.length}{" "}
                  subtasks
                </p>
              </P.Task>

              {context!.isTodoDetail ? (
                <TodoDetail
                  title={context!.task?.title!}
                  description={context!.task?.description!}
                  subTasks={context!.task?.subTasks!}
                />
              ) : null}
            </>
          ))}
        </ul>
      </P.Wrapper>
      <P.Wrapper>
        <P.KindTodo color="green" themeValue={theme!}>
          <div></div>
          <p>DONE ({data?.tasks?.doneTasks.length})</p>
        </P.KindTodo>
        <ul>
          {data?.tasks?.doneTasks?.map((el) => (
            <>
              <P.Task
                onClick={() => {
                  context!.openTodoDetail();

                  setTodoDetail((prev) => {
                    (prev.title = el.title),
                      (prev.description = el.description),
                      (prev.subTasks = el.subTasks);
                    return prev;
                  });
                  setTask(todoDetail);
                }}
                key={el.title}
                themeValue={theme!}
              >
                <p>{el.title}</p>
                <p>
                  {howManySubtasksIsDone(el.subTasks)} of {el.subTasks?.length}{" "}
                  subtasks
                </p>
              </P.Task>

              {context!.isTodoDetail ? (
                <TodoDetail
                  title={context!.task?.title!}
                  description={context!.task?.description!}
                  subTasks={context!.task?.subTasks!}
                />
              ) : null}
            </>
          ))}
        </ul>
      </P.Wrapper>
    </P.Container>
  );
};

export default Todo;
