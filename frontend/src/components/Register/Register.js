import React from "react";
import styled from "styled-components";
import { Button, Input } from "@mantine/core";

export const Wrapper = styled.div`
  margin: 30px auto;
  width: 320px;
  height: 420px;
`;

export const CInput = styled(Input)`
  margin-bottom: 15px;
`;

export const CButton = styled(Button)`
  width: 100%;
`;

const Register = () => {
  const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    height: calc(100vh - 101px);
  `;

  return (
    <RegisterContainer>
      <Wrapper>
        <CInput variant="default" placeholder="ID" />
        <CInput variant="default" placeholder="Password" />
        <CButton variant="light">회원가입</CButton>
      </Wrapper>
    </RegisterContainer>
  );
};

export default Register;
