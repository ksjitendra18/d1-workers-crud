import { FormEvent } from "react";
import { useSWRConfig } from "swr";
const AddTodos = () => {
  const { mutate } = useSWRConfig();
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const res = await fetch("http://127.0.0.1:8787/todos", {
        method: "post",
        body: JSON.stringify({ todo: formData.get("todo") }),
      });

      const resData = await res.json();

      if (resData?.success) {
        (e.target as HTMLFormElement).reset();
        mutate("/todos");
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <section className="add-todos-section">
      <div className="add-todos-meta">
        <h2 className="todos-heading">All Todos</h2>
      </div>

      <form onSubmit={handleFormSubmit} className="add-todos-form">
        <input type="text" placeholder="enter todo..." name="todo" id="todo" />
        <button>Add</button>
      </form>
    </section>
  );
};

export default AddTodos;
