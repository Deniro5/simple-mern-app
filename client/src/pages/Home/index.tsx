import React from "react";
import styled from "styled-components";
import TodoList from "../../components/TodoList";

export default function Home() {
  return (
    <ContentContainer>
      <TodoList />
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: auto;
  margin-top: 48px;
`;
