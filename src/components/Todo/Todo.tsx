import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import * as P from "./parts";
import TodoDetail from "../TodoDetail/TodoDetail";
import { SubTask } from "../../types";

interface TodoDetailType {
  title: string;
  description: string;
  subtasks: SubTask[];
}

const Todo = () => {
  const [todoDetail, setTodoDetail] = useState<TodoDetailType>({
    title: "",
    description: "",
    subtasks: [],
  });
  const context = useAuth();
  const theme = context?.theme;

  console.log(todoDetail);

  return (
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
                    (prev.subtasks = el.subTasks);
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
                subtasks={todoDetail.subtasks}
              />
            ) : null}
          </>
        ))}
      </ul>
    </P.Wrapper>
  );
};

export default Todo;
