import { eq, ilike } from "drizzle-orm";
import { db } from "./db/index.js";
import { todosTable } from "./db/schema.js";
import OpenAI from "openai";
import readlineSync from "readline-sync";

const client = new OpenAI();

// Tools
async function getAllTodos() {
  const todos = await db.select().from(todosTable);
  return todos;
}

async function createTodo(todo) {
  const [result] = await db.insert(todosTable).values({ todo }).returning({
    id: todosTable.id,
  });
  return result.id;
}

async function deleteTodoById(id) {
  await db.delete(todosTable).where(eq(todosTable.id, id));
}

async function searchTodo(search) {
  const todos = await db
    .select()
    .from(todosTable)
    .where(ilike(todosTable.todo, `%${search}%`));
  return todos;
}

const tools = {
  getAllTodos: getAllTodos,
  createTodo: createTodo,
  deleteTodoById: deleteTodoById,
  searchTodo: searchTodo,
};

// System Promppts

const SYSTEM_PROMPTS = `
You are an AI Assistant with START, PLAN, ACTION, OBESERVATION and Output State.
Wait for the user prompts and first Plan using available tools.
After plaining, Take action with appropriate tools and wait for Obersvation based on Action.
Once you get the obeservation, Return the AI response based on START prompt and obeservations.

You can manage tasks by adding, viewing, updating and deleteing
you must strickly follow the JSON output format.

Todo DB Schema:
id: Int and Primary key
todo: string
created_at: Date Time
updated_at: Date Time

Available Tools:
 - getAllTodos(): Returns all the Todos from Database
 - createTodo(todo: string): Creates a new TODOs in DB and takes todo as a string and returns the ID of created todo
 - searchTodo(search: string): Searches for all todos matching the query string using ilike operator
 - deleteTodoById(id: string): Delete the todo by ID given in the DB

Example:
START
{"type": "user","user": "Add a task for shopping groceries."}
{"type": "plan","plan": "I will try to get more context on what user needs to shop"}
{"type": "output","output": "Can you tell me what all items you want  to shop for?"}
{"type": "user","user": "I want to shop for milk, kurkure, lays and choco."}
{"type": "plan","plan": "I will use getAllTodos to create a new Todo in DB."}
{"type": "action","function": createTodo, "input": "Shopping for milk, kurkure, lays and choco."}
{"type": "obeservation", "obeservation": "2"}
{"type": "output","output": "Your todo has been added successfully"}
`;

const messages = [{ role: "system", content: SYSTEM_PROMPTS }];

while (true) {
  const query = readlineSync.question(
    "What would you like to add to your todo list? \n"
  );
  const q = {
    type: "user",
    user: query,
  };
  messages.push({ role: "user", content: JSON.stringify(q) });
  while (true) {
    const chat = await client.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      response_format: { type: "json_object" },
    });
    const result = chat.choices[0].message.content;
    messages.push({ role: "assistant", content: result });
    const action = JSON.parse(result);

    if (action.type == "output") {
      console.log(`🤖: ${action.output}`);
      break;
    } else if (action.type == "action") {
      const fn = tools[action.function];
      if (!fn) throw new Error("Invalid Tools call");
      const obeservation = await fn(action.input);
      const ObersvationMessage = {
        type: "obeservation",
        obeservation: obeservation,
      };
      messages.push({
        role: "developer",
        content: JSON.stringify(ObersvationMessage),
      });
    }
  }
}
