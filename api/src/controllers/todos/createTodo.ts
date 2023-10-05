import { Context } from "hono";

const createTodos = async (c: Context) => {
  const { todo } = await c.req.json();

  if (!todo) {
    return c.json({
      success: false,
      data: null,
      message: "todo is required",
    });
  }
  try {
    const { success } = await c.env.DB.prepare(
      "INSERT INTO todos (todo) values (?)"
    )
      .bind(todo)
      .run();

    if (!success) {
      return c.json(
        {
          success: false,
          message: "Error while adding new todo",
        },
        { status: 500 }
      );
    }
    return c.json(
      {
        success: true,
        message: "Added Successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return c.json({
      success: false,
      message: "Error while adding new todo",
    });
  }
};

export default createTodos;
