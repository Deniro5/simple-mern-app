import styled from "styled-components";
import { User } from "../../types";
import { Link } from "react-router-dom";

type HeaderProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function Header({ user, setUser }: HeaderProps) {
  const handleLogout = () => {
    fetch("http://localhost:8000/api/users/logout", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Logout successful");
          setUser(null);
        } else {
          console.log("Logout failed");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <StyledHeader>
      {user && (
        <Link onClick={handleLogout} to="login">
          Logout
        </Link>
      )}
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
