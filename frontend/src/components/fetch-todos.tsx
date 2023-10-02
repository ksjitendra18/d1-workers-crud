import { Check, RotateCcw, Trash2 } from "lucide-react";
import useSWR, { useSWRConfig } from "swr";
interface Todos {
  id: number;
  todo: string;
  is_completed: number;
}

const FetchTodos = () => {
  const fetchTodos = async () => {
    const res = await fetch("http://127.0.0.1:8787/todos");
    const resData = await res.json();
    return resData.data;
  };

  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR<Todos[], Error>(
    "/todos",
    fetchTodos
  );

  const handleComplete = async (todoId: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:8787/todos/${todoId}`, {
        method: "PATCH",
        body: JSON.stringify({ todoStatus: true }),
      });

      const resData = await res.json();

      mutate("/todos");
    } catch (error) {
      console.log("error while deleting");
    }
  };
  const handleRedo = async (todoId: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:8787/todos/${todoId}`, {
        method: "PATCH",
        body: JSON.stringify({ todoStatus: false }),
      });

      const resData = await res.json();

      mutate("/todos");
    } catch (error) {
      console.log("error while deleting");
    }
  };
  const handleDelete = async (todoId: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:8787/todos/${todoId}`, {
        method: "DELETE",
      });

      const resData = await res.json();

      mutate("/todos");
    } catch (error) {
      console.log("error while deleting");
    }
  };

  const hasCompletedTodos = data?.some((todo) => todo.is_completed === 1);

  if (isLoading) {
    return (
      <div className="loading-body">
        <div className="loading-todo"></div>
        <div className="loading-action">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {error ? (
        <div className="error-card">
          <p>Error while fetching todos</p>
        </div>
      ) : null}
      <div className="todos-list">
        {!isLoading &&
          !error &&
          data?.map((todo) => (
            <>
              {!todo.is_completed && (
                <div
                  className={`todo-item ${
                    todo.is_completed === 1 ? "complete" : ""
                  }`}
                  key={todo.id}
                >
                  <p>{todo.todo}</p>
                  <div className="todo-actions">
                    <div className="todo-action complete">
                      <Check onClick={() => handleComplete(todo.id)} />
                    </div>
                    <div
                      className="todo-action delete"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <Trash2 />
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
      </div>

      <div className="todos-list">
        {hasCompletedTodos ? (
          <h2 className="todos-heading">Completed Todos</h2>
        ) : null}

        {!isLoading &&
          data?.map((todo) => (
            <>
              {todo.is_completed ? (
                <div
                  className={`todo-item ${
                    todo.is_completed === 1 ? "complete" : ""
                  }`}
                  key={todo.id}
                >
                  <p>{todo.todo}</p>
                  <div className="todo-actions">
                    <div className="todo-action complete">
                      <RotateCcw onClick={() => handleRedo(todo.id)} />
                    </div>
                    <div
                      className="todo-action delete"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <Trash2 />
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ))}
      </div>
    </div>
  );
};

export default FetchTodos;
