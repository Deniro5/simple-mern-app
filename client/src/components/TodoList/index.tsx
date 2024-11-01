import styled from "styled-components";
import TodoListItem from "./TodoListItem";
import useFetchTodos from "../../hooks/useFetchTodos";
import AddTodo from "../AddTodo";

export default function TodoList() {
  const { todos, error, loading, createTodo, updateTodo, deleteTodo } =
    useFetchTodos();

  const getContent = () => {
    if (error) {
      return <p> {error} </p>;
    }

    if (loading) {
      return <p> Loading Todo list </p>;
    }

    if (todos.length === 0) {
      return <p> Add an item using the input above </p>;
    }
    return todos.map((todo) => (
      <TodoListItem
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        key={todo._id}
        todo={todo}
      />
    ));
  };

  return (
    <Container>
      <AddTodo createTodo={createTodo} />
      {getContent()}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: auto;
  margin-top: 12px;
`;
