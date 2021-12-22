import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from '@mantine/core';
import { login, register } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

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

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: calc(100vh - 101px); */
  height: 100vh;
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      alert('Username Password를 입력해주세요!');
      return;
    }

    const { data, status } = await register(username, password);
    console.log(data);
    if (status === 200) {
      setUsername('');
      setPassword('');
      alert('회원가입이 성공! 로그인해주세요.');
      navigate('/login');
    } else {
      alert(data.message);
    }
  };

  return (
    <RegisterContainer>
      <Wrapper>
        <CInput
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          variant="default"
          placeholder="ID"
        />
        <CInput
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          variant="default"
          type="password"
          placeholder="Password"
        />
        <CButton onClick={handleRegister} variant="light">
          회원가입
        </CButton>
      </Wrapper>
    </RegisterContainer>
  );
};

export default Register;
