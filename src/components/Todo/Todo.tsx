import React from "react";
import { useAuth } from "../../context/AuthContext";
import * as P from "./parts";
import TodoDetail from "../TodoDetail/TodoDetail";

const Todo = () => {
  const context = useAuth();
  const theme = context?.theme;
  console.log(context?.isTodoDetail);

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
              onClick={() => context.openTodoDetail()}
              key={el.title}
              themeValue={theme!}
            >
              <p>{el.title}</p>
              <p>0 of {el.subTasks?.length} subtasks</p>
            </P.Task>
            {context.isTodoDetail ? (
              <TodoDetail
                title={el.title}
                description={el.description}
                subtasks={el.subTasks}
              />
            ) : null}
          </>
        ))}
      </ul>
    </P.Wrapper>
  );
};

export default Todo;
