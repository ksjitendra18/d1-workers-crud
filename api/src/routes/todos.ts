import { Hono } from "hono";
import createTodos from "../controllers/todos/createTodo";
import getTodos from "../controllers/todos/getTodos";
import deleteTodo from "../controllers/todos/deleteTodos";
import updateTodos from "../controllers/todos/updateTodo";

const todosRoutes = new Hono();

todosRoutes.post("/", createTodos);
todosRoutes.get("/", getTodos);
todosRoutes.patch("/:todoId", updateTodos);
todosRoutes.delete("/:todoId", deleteTodo);

export default todosRoutes;
