import styled from "styled-components";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

const App = () => {
  return (
    <>
      <Header />
      <ContentContainer>
        <TodoList />
      </ContentContainer>
    </>
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: auto;
  margin-top: 48px;
`;

export default App;
