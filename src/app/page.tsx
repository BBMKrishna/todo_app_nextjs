import TodoItem, { TodoItemProps } from "@/components/TodoItem";
import prisma from "@/db";
import Link from "next/link";

async function toggleTodo(checked: boolean, id: string) {
  "use server";
  const todo = await prisma.todo.findUnique({ where: { id } });

  if (!todo) {
    throw new Error("Todo not found");
  }
  await prisma.todo.update({
    where: { id },
    data: { completed: checked },
  });
}
const getTodos = async () => {
  const todos = await prisma.todo.findMany({});
  return todos;
};
export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-bold">TODO'S</h1>
        <Link
          className="border border-slate-300 p-2 text-slate-100 rounded hover:bg-slate-700 focus-within::bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
