import prisma from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

async function createTodo(data: FormData) {
  "use server";
  const title = data.get("title")?.toString();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid title");
  }
  await prisma.todo.create({
    data: { title: title, completed: false },
  });

  redirect("/");
}
const page = () => {
  return (
    <>
      <header className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-bold">TODO'S</h1>
      </header>
      <form action={createTodo} className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:bg-slate-700 "
        ></input>

        <div className="flex justify-end mt-4 gap-2">
          <Link
            href="/"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:bg-slate-700 "
          >
            Cancel
          </Link>
          <button
            type="submit"
            className=" cursor-pointer border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:bg-slate-700 "
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default page;
