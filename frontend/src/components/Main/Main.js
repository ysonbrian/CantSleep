import React from 'react';
import MainList from './MainList';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const MainListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
`;

const MainHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  padding: 20px;
  margin-top: 50px;
  margin-bottom: 30px;
  width: 100%;
  p {
    font-size: 40px;
  }
`;

const Main = ({ writingList, onClickedItem }) => {
  const onClick = (data) => {
    onClickedItem(data);
  };
  return (
    <MainContainer>
      <MainHeader>
        <p>게시글</p>
      </MainHeader>
      <MainListContainer>
        <MainList writingList={writingList} />
      </MainListContainer>
    </MainContainer>
  );
};

export default Main;
