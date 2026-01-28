import { useState } from "react";
import { FlexBox } from "@ui5/webcomponents-react";
import { Todo } from "../../types/todo";
import TodoInput from "@root/components/TodoInput";
import TodoList from "@root/components/TodoList";

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string, dueDate?: string) => {
    setTodos([
      ...todos,
      { id: Date.now(), text, dueDate, completed: false },
    ]);
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTodo = (id: number, newText: string, newDate?: string) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, text: newText, dueDate: newDate } : t
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <FlexBox direction="Column" style={{ gap: "1.5rem" }}>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleComplete}
        onEdit={editTodo}
        onDelete={deleteTodo}
      />
    </FlexBox>
  );
}

export default TodoPage;
