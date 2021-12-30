import React from 'react';
import MainListItem from './MainListItem';
import styled from 'styled-components';

const MainListContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 100px;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
`;

const MainList = ({ writingList, onClickedItem }) => {
  console.log('onClickedItem', onClickedItem);
  const onClickItem = (data) => {
    onClickedItem(data);
  };
  return (
    <MainListContainer>
      {writingList?.map((data) => (
        <MainListItem key={data.id} data={data} onClickedItem={onClickItem} />
      ))}
    </MainListContainer>
  );
};

export default MainList;
