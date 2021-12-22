import React from "react";
import styled from "styled-components";
import { CButton, CInput, Wrapper } from "../Register/Register";
const Login = () => {
  const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
  `;
  return (
    <LoginContainer>
      <Wrapper>
        <CInput variant="default" placeholder="ID" />
        <CInput variant="default" type="password" placeholder="Password" />
        <CButton variant="light">로그인</CButton>
      </Wrapper>
    </LoginContainer>
  );
};

export default Login;
