import React from "react";
import { useAuth } from "../../context/AuthContext";

const Todo = () => {
  const context = useAuth();

  console.log(context?.boardData);

  return (
    <div>
      <ul>
        {context?.boardData?.tasks?.notStartYetTasks.map((el) => (
          <li>{el.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
