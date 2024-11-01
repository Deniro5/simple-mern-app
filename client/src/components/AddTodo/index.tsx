import { useState } from "react";
import styled from "styled-components";

type TodoListItemProps = {
  createTodo: (newTodoName: string) => {};
};

export default function AddTask({ createTodo }: TodoListItemProps) {
  const [todoName, setTodoName] = useState("");

  function handleAddTask() {
    createTodo(todoName);
    setTodoName("");
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      handleAddTask();
    }
  }
  return (
    <Container>
      <SearchBar
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        placeholder="Enter name of new todo list item"
        onKeyUp={handleKeyUp}
      />
      <AddButton onClick={handleAddTask}> Add Task </AddButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SearchBar = styled.input`
  height: 36px;
  padding: 0 12px;
  flex: 1;
`;

const AddButton = styled.button`
  height: 36px;
  padding: 0 12px;
  width: 120px;
  background: green;
  color: white;
  border: none;
  &:hover {
    background: darkgreen;
    cursor: pointer;
  }
`;
