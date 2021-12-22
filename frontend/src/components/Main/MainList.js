import React from 'react';
import MainListItem from './MainListItem';

const MainList = ({ writingList, onClickedItem }) => {
  console.log('onClickedItem', onClickedItem);
  const onClickItem = (data) => {
    onClickedItem(data);
  };
  return (
    <>
      {writingList.map((data) => (
        <MainListItem data={data} onClickedItem={onClickItem} />
      ))}
    </>
  );
};

export default MainList;
