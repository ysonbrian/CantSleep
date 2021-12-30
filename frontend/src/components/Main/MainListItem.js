import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import tempImg from '../../image/MainRight.jpg';
import { useClickedItem } from '../../utils/store';
import { useNavigate } from 'react-router-dom';

const MainListItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: left;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  gap: 10px;
  background-color: #fefefe;
  border: 1px solid rgb(206, 202, 202);
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  a {
    text-decoration: none;
    color: black;
  }

  :hover {
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 25%) 0px 4px 16px 0px;
    overflow: hidden;
    transform: translateY(-6px);
  }
`;
const MainItemImg = styled.img`
  width: 100%;
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

const MainItemDiv = styled.div`
  padding: 10px 0;
`;

const MainItemImageContainer = styled.div``;

const MainListItem = ({ data, onClickedItem }) => {
  let navigate = useNavigate();
  const [clickedItem, setClickedItem] = useClickedItem((state) => [
    state.clickedItem,
    state.setClickedItem,
  ]);

  const onClickItem = (data) => {
    setClickedItem(data);
    onClickedItem(data);
    navigate(`/list/${data.id}`);
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
        <MainItemImageContainer>
          <MainItemImg src={tempImg} />
        </MainItemImageContainer>
        <MainItemDiv>
          <MainItemUser>{data.userId}</MainItemUser>
          <MainItemTitle>{data.title}</MainItemTitle>
          <MainItemContent>{data.content}</MainItemContent>
          <MainItemDate>{date ? rDate : null}</MainItemDate>
        </MainItemDiv>
      </Link>
    </MainListItemContainer>
  );
};

export default MainListItem;
