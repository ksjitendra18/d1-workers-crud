import { Context } from "hono";

const deleteTodo = async (c: Context) => {
  const todoId = c.req.param("todoId");

  try {
    const { success } = await c.env.DB.prepare("DELETE FROM todos where id = ?")
      .bind(todoId)
      .run();

    if (!success) {
      return c.json({
        success: true,
        data: {
          deleted: false,
        },
        message: "Unable to delete. Please try later",
      });
    }

    return c.json({
      success: true,
      data: {
        deleted: true,
      },
    });
  } catch (error) {
    console.log("error", error);
    return c.json({
      success: false,
      data: null,
      message: "Server Error",
    });
  }
};

export default deleteTodo;
