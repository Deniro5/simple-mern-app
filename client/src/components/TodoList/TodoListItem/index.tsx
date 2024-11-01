import styled from "styled-components";
import { Todo } from "../../../types";

type TodoListItemProps = {
  todo: Todo;
  updateTodo: (updatedTodo: Todo) => {};
  deleteTodo: (idToDelete: string) => {};
};

export default function TodoListItem({
  todo,
  updateTodo,
  deleteTodo,
}: TodoListItemProps) {
  const { name, isComplete } = todo;

  function handleToggleComplete() {
    updateTodo({
      ...todo,
      isComplete: !todo.isComplete,
    });
  }

  function handleDelete() {
    deleteTodo(todo._id);
  }

  return (
    <Container>
      <Name isComplete={isComplete}> {name} </Name>
      <ButtonContainer>
        <CompleteButton onClick={handleToggleComplete}>
          Mark {isComplete ? "Incomplete" : "Complete"}{" "}
        </CompleteButton>
        <DeleteButton onClick={handleDelete}> Delete </DeleteButton>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 24px;
  border: 1px solid grey;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Name = styled.div<{ isComplete: boolean }>`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: ${({ isComplete }) => isComplete && "line-through"};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const Button = styled.button`
  height: 36px;
  padding: 0 12px;

  color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const CompleteButton = styled(Button)`
  background: green;
  &:hover {
    background: darkgreen;
  }
  width: 130px;
`;

const DeleteButton = styled(Button)`
  background: orangered;
  &:hover {
    background: darkred;
  }
  width: 90px;
`;
