import React from "react";
import AddTodos from "./add-todos";
import FetchTodos from "./fetch-todos";

const Todos = () => {
  return (
    <div>
      <AddTodos />
      <FetchTodos />
    </div>
  );
};

export default Todos;
