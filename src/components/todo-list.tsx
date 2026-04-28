'use client';

import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import { getTodo, getTodos, createTodo, updateTodo, deleteTodo } from "@/services/todos";

import { Card, CardContent } from "./ui/card";
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

import TodoForm from "./todo-form";


export default function TodoList(){
    const queryClient=useQueryClient();
    const {data, isLoading}=useQuery({
        queryKey:['todos'],
        queryFn: getTodos,
    });
    const addMutation=useMutation({
        mutationFn: createTodo,
        onSuccess: ()=>
            queryClient.invalidateQueries({
                queryKey: ['todos'],
            })
    });
    const updateMutation=useMutation({
        mutationFn: ({
            id,
            completed,
        }:{
            id:number;
            completed:boolean
        }) => updateTodo(id,completed),
        onSuccess:()=>
            queryClient.invalidateQueries({
                queryKey: ['todos'],
            }),
    });

    const deleteMutation= useMutation({
        mutationFn:deleteTodo,
        onSuccess: ()=>
            queryClient.invalidateQueries({
                queryKey:['todos'],
            })
    })
    if(isLoading) return <p>Loading todos ...</p>

    return (
        <div className="space-y-4">
            <TodoForm
            onAdd={(title)=>addMutation.mutate(title)}
            />

            {data?.map((todo)=>(
                <Card key={todo.id}>
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            <Checkbox
                               checked={todo.completed}
                               onChangeCapture={()=>
                                  updateMutation.mutate({
                                    id:todo.id,
                                    completed: !todo.completed,
                                  })
                               }
                               />

                               <span
                                 className={
                                    todo.completed ? 'line-through text-gray-400' : ''
                                 }>
                                    {todo.title}
                                 </span>
                        </div>
                        <Button
                           variant="destructive"
                            onClick={() =>
                                deleteMutation.mutate(todo.id)
                            }
                        >Delete
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}