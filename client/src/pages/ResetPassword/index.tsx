import React, { useState } from "react";
import styled from "styled-components";
import ResetPasswordSuccess from "./ForgotPasswordSuccess";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {};

  return (
    <ResetPasswordContainer>
      <Title> Reset Password</Title>
      {!showSuccess ? (
        <ResetPasswordSuccess />
      ) : (
        <>
          <InputContainer>
            <Label> New Password: </Label>
            <StyledInput value={password} onChange={handlePasswordChange} />
          </InputContainer>

          <InputContainer>
            <Label> Confirm Password: </Label>
            <StyledInput
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </InputContainer>
          <Button onClick={handleSubmit}> Submit Changes </Button>
        </>
      )}
    </ResetPasswordContainer>
  );
}

const Title = styled.p`
  text-align: center;
  font-weight: bold;
  margin-top: 0;
`;

const ResetPasswordContainer = styled.div`
  margin: auto;
  padding: 24px;
  gap: 24px;
  margin-top: 20vh;
  border: 1px solid grey;
  border-radius: 8px;
  width: 400px;
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
