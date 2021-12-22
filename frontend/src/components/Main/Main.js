import React from 'react';
import MainList from './MainList';
import styled from 'styled-components';

const Main = ({ writingList, onClickedItem }) => {
  console.log(onClickedItem);
  const MainContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
    margin: 10px;
    height: 100vh;
  `;
  const MainHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
    font-size: 40px;
    margin-top: 100px;

    p {
      font-size: 40px;
    }
  `;

  const onClick = (data) => {
    onClickedItem(data);
  };
  return (
    <MainContainer>
      <MainHeader>
        <p>게시글</p>
      </MainHeader>

      <MainList writingList={writingList} onClickedItem={onClick} />
    </MainContainer>
  );
};

export default Main;
