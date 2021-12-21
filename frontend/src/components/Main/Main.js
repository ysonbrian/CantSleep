import React from 'react';
import MainList from './MainList';
import styled from 'styled-components';

const Main = ({ writingList, onClickedItem }) => {
  console.log(onClickedItem);
  const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
    margin-right: 20%;
    margin-left: 20%;
  `;
  const MainHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
    font-size: 40px;
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
