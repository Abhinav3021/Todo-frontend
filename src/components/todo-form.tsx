'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function TodoForm({
    onAdd,
}:{
    onAdd: (title:string)=>void;
}){
    const [title,setTitle]=useState('');
    const submit=()=>{
        if(!title.trim()) return;
        onAdd(title);
        setTitle('');
    };

    return(
        <div className="flex gap-2">
            <Input
            placeholder="Add a todo"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <Button onClick={submit}>Add</Button>
        </div>
    )
}