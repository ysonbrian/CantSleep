import React from 'react';
import MainListItem from './MainListItem';
import styled from 'styled-components';
import { useClickedItem } from '../../utils/store';
import { createApi } from 'unsplash-js';

const MainListContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 100px;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    font-size: 14px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    font-size: 12px;
  }
`;

const MainList = ({ writingList, onClickedItem, img }) => {
  console.log('onClickedItem', onClickedItem);

  const [clickedItem, setClickedItem] = useClickedItem((state) => [
    state.clickedItem,
    state.setClickedItem,
  ]);

  const onClickItem = (data) => {
    setClickedItem(data);
  };
  const unsplash = createApi({
    accessKey: 'JuOn-1RPN6tAIe9HrVn2EvBYOpv6I_AhI1-60QAl9n8',
  });
  return (
    <MainListContainer>
      {writingList?.map((data) => {
        return (
          <MainListItem
            key={data?.id}
            data={data}
            img={img}
            onClick={onClickItem}
          />
        );
      })}
    </MainListContainer>
  );
};

export default MainList;
