import React, { useState } from "react";
import styled from "styled-components";
import TodoList from "../../components/TodoList";
import { Link, useNavigate } from "react-router-dom";
import { EmailValidator } from "../../utils";
import { User } from "../../types";

type LoginProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function Login({ setUser }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    if (!email || !password) return;
    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const user = await response.json();
      setUser(user);
      navigate("/");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <LoginContainer>
      <Title> Login</Title>
      {error && <ErrorMessage> {error} </ErrorMessage>}
      <InputContainer>
        <Label> Email: </Label>
        <StyledInput value={email} onChange={handleEmailChange} />
      </InputContainer>

      <InputContainer>
        <Label> Password: </Label>
        <StyledInput
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </InputContainer>
      <LinkContainer>
        <Link to={"/signup"}>
          {" "}
          Dont have an account? Click here to register{" "}
        </Link>
      </LinkContainer>
      <LinkContainer>
        <Link to={"/forgot-password"}> I forgot my password </Link>
      </LinkContainer>
      <LoginButton onClick={handleSubmit}> Login </LoginButton>
    </LoginContainer>
  );
}

const Title = styled.p`
  text-align: center;
  font-weight: bold;
  margin-top: 0;
`;

const LoginContainer = styled.div`
  margin: auto;
  padding: 24px;
  gap: 24px;
  margin-top: 20vh;
  border: 1px solid grey;
  border-radius: 8px;
  width: 400px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const StyledInput = styled.input`
  height: 40px;
  width: 100%;
  padding: 0px 12px;
`;

const InputContainer = styled.div`
  margin: 12px 0px;
`;

const Label = styled.p`
  margin-bottom: 16px;
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 24px;
`;

const LoginButton = styled.button`
  margin-top: 24px;
  width: 100%;
  height: 40px;
  background: navy;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background: blue;
    cursor: pointer;
  }
`;
