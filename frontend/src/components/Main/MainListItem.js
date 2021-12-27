import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainListItem = ({ data, onClickedItem }) => {
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
    border-radius: 5px;
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
    color: #788187;
    margin-bottom: 5px;
  `;

  const MainItemContent = styled.p`
    margin-bottom: 5px;
  `;

  const MainItemDate = styled.span`
    font-style: italic;
    margin-bottom: 5px;
  `;
  const MainItemUser = styled.span`
    font-size: 20px;
    margin-bottom: 5px;
  `;

  const onClickItem = (data) => {
    onClickedItem(data);
  };

  const date = data?.createdAt?.split('T');
  let rDate = null;
  if (date) {
    const newDate = date[0]?.split('-');
    const newtime = date[1]?.split('.');
    const newtime2 = newtime[0]?.split(':');
    const result = [...newDate, ...newtime2];
    rDate = new Date(
      Date.UTC(
        result[0],
        result[1] - 1,
        result[2],
        result[3],
        result[4],
        result[5]
      )
    ).toLocaleString();
  }

  return (
    <MainListItemContainer onClick={() => onClickItem(data)}>
      <Link
        data={data}
        to={{
          pathname: `/list/${data.id}`,
          state: data,
        }}
      >
        <MainItemUser>{data.userId}</MainItemUser>
        <MainItemTitle>{data.title}</MainItemTitle>
        <MainItemContent>{data.content}</MainItemContent>
        <MainItemDate>{date ? rDate : null}</MainItemDate>
      </Link>
    </MainListItemContainer>
  );
};

export default MainListItem;
