import React from 'react';
import styled from 'styled-components';
const Main = ({ writingList }) => {
  const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  return <MainContainer>글 목록</MainContainer>;
};

export default Main;
