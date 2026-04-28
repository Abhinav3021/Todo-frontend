# Todo App Frontend - Next.js

A Todo frontend built with Next.js, React, Tailwind CSS, TanStack Query, and shadcn-ui.

This frontend connects to the NestJS backend and to manage todos with real-time updates using query caching and mutations.

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- shadcn/ui

---

## Installation

Clone the repository:
```bash
git clone <your-frontend-repo-url>
cd todo-frontend
```

Install dependencies:
```bash
pnpm install
```

Running Locally

Start development server:
```bash
pnpm dev
```
Frontend runs on:

http://localhost:3000


## TanStack Query Usage
Fetch Todos
```bash
useQuery({
  queryKey: ['todos'],
  queryFn: getTodos
})
```

Create Todo
```bash
useMutation({
  mutationFn: createTodo
})
```
```bash
Update Todo
useMutation({
  mutationFn: updateTodo
})
```

Delete Todo
```bash
useMutation({
  mutationFn: deleteTodo
})
```

Cache Refresh
```bash
queryClient.invalidateQueries({
  queryKey: ['todos']
})
```
## API Integration

Axios instance is configured with:
```bash
http://localhost:5000
```

Routes used:

- GET    /todos/drizzle
- POST   /todos/drizzle
- PATCH  /todos/drizzle/:id
- DELETE /todos/drizzle/:id