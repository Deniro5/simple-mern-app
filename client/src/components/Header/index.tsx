import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <p> Login </p>
      <p> Signout </p>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  height: 60px;
  border-bottom: 1px solid grey;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
`;
