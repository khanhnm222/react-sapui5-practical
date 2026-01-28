import React, { useState } from "react";
import {
  Panel,
  CheckBox,
  Button,
  FlexBox,
} from "@ui5/webcomponents-react";
import { Todo } from "@root/types/todo";

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onEdit: (id: number, newText: string, newDate?: string) => void;
  onDelete: (id: number) => void;
};

function TodoList({ todos, onToggle, onEdit, onDelete }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");

  const handleSave = (id: number) => {
    onEdit(id, editText, editDate);
    setEditingId(null);
  };

  const renderTask = (todo: Todo) => (
    <FlexBox
      key={todo.id}
      justifyContent="SpaceBetween"
      style={{
        padding: "0.5rem 1rem",
        borderBottom: "1px solid #ddd",
        alignItems: "center",
      }}
    >
      <FlexBox alignItems="Center" style={{ gap: "0.5rem" }}>
        <CheckBox
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>
          {todo.text}{" "}
          {todo.dueDate && (
            <small>- finish before: {todo.dueDate}</small>
          )}
        </span>
      </FlexBox>
      <FlexBox style={{ gap: "0.5rem" }}>
        {editingId === todo.id ? (
          <Button design="Emphasized" onClick={() => handleSave(todo.id)}>
            Save
          </Button>
        ) : (
          <Button onClick={() => {
            setEditingId(todo.id);
            setEditText(todo.text);
            setEditDate(todo.dueDate || "");
          }}>Edit</Button>
        )}
        <Button design="Negative" onClick={() => onDelete(todo.id)}>
          Delete
        </Button>
      </FlexBox>
    </FlexBox>
  );

  return (
    <>
      <Panel headerText="Incompleted Tasks" collapsed={false}>
        {todos.filter((t) => !t.completed).map(renderTask)}
      </Panel>
      <Panel headerText="Completed Tasks" collapsed={false}>
        {todos.filter((t) => t.completed).map(renderTask)}
      </Panel>
    </>
  );
}

export default TodoList;
