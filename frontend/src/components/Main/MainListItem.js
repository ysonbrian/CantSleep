import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainListItem = ({ data, onClickedItem }) => {
  console.log('MainListItem', onClickedItem);
  const MainListItemContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: left;
    flex-direction: column;
    width: 100%;
    border: 1px solid black;
    padding: 20px;
    gap: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: #fefefe;
    a {
      text-decoration: none;
      color: black;
    }
    :hover {
      background-color: #05b388;
      a {
        color: white;
      }
    }
  `;

  const MainItemTitle = styled.p`
    font-size: 20px;
    margin-bottom: 10px;
  `;

  const MainItemContent = styled.p`
    font-style: italic;
  `;

  const MainItemDate = styled.p`
    font-style: italic;
  `;

  const onClickItem = (data) => {
    console.log(onClickedItem);
    onClickedItem(data);
  };

  return (
    <MainListItemContainer onClick={() => onClickItem(data)}>
      <Link
        data={data}
        to={{
          pathname: `/list/${data.id}`,
          state: data,
        }}
      >
        <MainItemTitle>{data.title}</MainItemTitle>
        {/* <MainItemContent>{data.content}</MainItemContent> */}
        <MainItemDate>{data.date}</MainItemDate>
      </Link>
    </MainListItemContainer>
  );
};

export default MainListItem;
