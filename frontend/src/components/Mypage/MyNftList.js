import React from 'react';
import MyNftItem from './MyNftItem';
import styled from 'styled-components';
import { useMyNftList } from '../../utils/store';
const MyNftListContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
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

const MyNftList = () => {
  const [myNftList, setMyNftList] = useMyNftList((state) => [
    state.myNftList,
    state.setMyNftList,
  ]);
  return (
    <MyNftListContainer>
      {myNftList?.map((data) => (
        <MyNftItem key={data.id} data={data} />
      ))}
    </MyNftListContainer>
  );
};

export default MyNftList;
