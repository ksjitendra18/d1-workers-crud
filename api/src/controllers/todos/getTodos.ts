import { Context } from "hono";

const getTodos = async (c: Context) => {
  try {
    const { results: todos } = await c.env.DB.prepare(
      "SELECT * FROM todos ORDER BY created_at desc"
    ).all();

    return c.json({
      success: true,
      data: todos,
    });
  } catch (error) {
    return c.json({
      success: false,
      message: "Error while fetching  todos",
    });
  }
};

export default getTodos;
