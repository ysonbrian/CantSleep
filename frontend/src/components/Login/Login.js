import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../utils/auth";
import { CButton, CInput, Wrapper } from "../Register/Register";
import { useStore } from "../../utils/store";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);

  const handleLogin = async () => {
    const {
      accessToken,
      address,
      username: userName,
    } = await login(username, password);
    console.log(accessToken, address, userName);
    setUser({
      accessToken,
      address,
      username: userName,
    });
  };

  useEffect(() => {
    if (user?.username) {
      navigate("/");
    }
  }, [user]);

  return (
    <LoginContainer>
      {!user?.username && (
        <Wrapper>
          <CInput
            onChange={(e) => setUsername(e.target.value)}
            variant="default"
            placeholder="Username"
          />
          <CInput
            onChange={(e) => setPassword(e.target.value)}
            variant="default"
            type="password"
            placeholder="Password"
          />
          <CButton onClick={handleLogin} variant="light">
            로그인
          </CButton>
        </Wrapper>
      )}
    </LoginContainer>
  );
};

export default Login;
