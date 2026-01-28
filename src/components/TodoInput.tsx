import { useState } from "react";
import {
  Input,
  Button,
  DatePicker,
  FlexBox,
} from "@ui5/webcomponents-react";

type Props = {
  onAdd: (text: string, dueDate?: string) => void;
};

function TodoInput({ onAdd }: Props) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") return;
    onAdd(task, date);
    setTask("");
    setDate("");
  };

  return (
    <FlexBox direction="Row" style={{ gap: "0.5rem" }}>
      <Input
        placeholder="Type a task..."
        style={{ flex: 1 }}
        value={task}
        onInput={(e: any) => setTask(e.target.value)}
      />
      <DatePicker
        placeholder="dd/MM/yyyy"
        value={date}
        onChange={(e: any) => setDate(e.target.value)}
      />
      <Button design="Emphasized" onClick={handleAdd}>
        Add Todo
      </Button>
    </FlexBox>
  );
}

export default TodoInput;
