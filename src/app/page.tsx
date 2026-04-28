import TodoList from "@/components/todo-list";

export default function HomePage(){
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Todo Dashboard
      </h1>
      <TodoList/>
    </main>
  )
}
