import React, { useState } from "react";
import styled from "styled-components";
import { EmailValidator } from "../../utils";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    if (!email) return;

    if (!EmailValidator(email)) {
      setError("Invalid email");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setShowSuccess(true);
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <ForgotPasswordContainer>
      <Title> Forgot Password</Title>
      {showSuccess ? (
        <ForgotPasswordSuccess />
      ) : (
        <>
          {error && <ErrorMessage> {error} </ErrorMessage>}
          <InputContainer>
            <Label> Email: </Label>
            <StyledInput value={email} onChange={handleEmailChange} />
          </InputContainer>

          <Button onClick={handleSubmit}> Reset Password </Button>
        </>
      )}
    </ForgotPasswordContainer>
  );
}

const Title = styled.p`
  text-align: center;
  font-weight: bold;
  margin-top: 0;
`;

const ForgotPasswordContainer = styled.div`
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

const Button = styled.button`
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