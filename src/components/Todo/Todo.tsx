import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import * as P from "./parts";
import TodoDetail from "../TodoDetail/TodoDetail";
import { SubTask, Task } from "../../types";

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
  console.log(context!.task);
  console.log(todoDetail);
  return (
    <P.Container>
      <P.Wrapper>
        <P.KindTodo themeValue={theme!}>
          <div></div>
          <p>TODO ({context?.boardData?.tasks?.notStartYetTasks.length})</p>
        </P.KindTodo>
        <ul>
          {context?.boardData?.tasks?.notStartYetTasks?.map((el) => (
            <>
              <P.Task
                onClick={() => {
                  context.openTodoDetail();
                  setTodoDetail((prev) => {
                    (prev.title = el.title),
                      (prev.description = el.description),
                      (prev.subTasks = el.subTasks);
                    return prev;
                  });
                }}
                key={el.title}
                themeValue={theme!}
              >
                <p>{el.title}</p>
                <p>0 of {el.subTasks?.length} subtasks</p>
              </P.Task>
              {context.isTodoDetail ? (
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
        <P.KindTodo themeValue={theme!}>
          <div></div>
          <p>TODO ({context?.boardData?.tasks?.notStartYetTasks.length})</p>
        </P.KindTodo>
        <ul>
          {context?.boardData?.tasks?.notStartYetTasks?.map((el) => (
            <>
              <P.Task
                onClick={() => {
                  context.openTodoDetail();

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

              {context.isTodoDetail ? (
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
        <P.KindTodo themeValue={theme!}>
          <div></div>
          <p>PENDING ({context?.boardData?.tasks?.pendingTasks.length})</p>
        </P.KindTodo>
        <ul>
          {context?.boardData?.tasks?.pendingTasks?.map((el) => (
            <>
              <P.Task
                onClick={() => {
                  context.openTodoDetail();

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

              {context.isTodoDetail ? (
                <TodoDetail
                  title={context.task?.title!}
                  description={context.task?.description!}
                  subTasks={context.task?.subTasks!}
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
