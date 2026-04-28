import { api } from "@/lib/axios";

export type Todo={
    id:number;
    title:string;
    completed: boolean;
};

export const getTodos=async():Promise<Todo[]>=>{
    const {data}=await api.get('/todos/drizzle/all');
    return data;
};

export const getTodo=async(id:number):Promise<Todo[]>=>{
    const {data}=await api.get(`/todos/drizzle/${id}`);
    return data;
};

export const createTodo = async (title: string) => {
  const { data } = await api.post('/todos/drizzle', { title });
  return data;
};

export const updateTodo = async (
  id: number,
  completed: boolean,
) => {
  const { data } = await api.patch(`/todos/drizzle/${id}`, {
    completed,
  });

  return data;
};

export const deleteTodo = async (id: number) => {
  const { data } = await api.delete(`/todos/drizzle/${id}`);
  return data;
};