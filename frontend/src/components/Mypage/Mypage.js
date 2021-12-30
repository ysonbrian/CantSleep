import React from 'react';
import styled from 'styled-components';
import { useStore, useMyNftList } from '../../utils/store';
import MyNftList from './MyNftList';

const MyPageContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  margin: 10px;
`;
const MyInfoContainer = styled.div`
  margin: 20px;
`;

const ImageContainer = styled.div`
  text-align: center;
`;
const MyImage = styled.img`
  background-image: linear-gradient(
    319deg,
    #118ab2 0%,
    #06d6a0 37%,
    #ffd166 100%
  );
  background-repeat: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: #f2f2f2;
  background-size: cover;
  background-position: center center;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  margin: 10px;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    font-size: 30px;
    font-weight: 600;
    min-height: 40px;
    color: rgb(53, 56, 64);
  }
  p {
    color: rgb(112, 122, 131);
  }
`;
const MyNftListContainer = styled.div`
  margin: 20px;
`;

const NodataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: 600;
  margin-top: 32px;
  border-radius: 10px;
  border: 1px solid rgb(211, 213, 214);
  height: 248px;
  margin: 24px 0px;
`;

const NoData = () => {
  return <NodataContainer>NFT 상품이 없습니다!</NodataContainer>;
};

const Mypage = () => {
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  const [myNftList, setMyNftList] = useMyNftList((state) => [
    state.myNftList,
    state.setMyNftList,
  ]);

  return (
    <MyPageContainer>
      <MyInfoContainer>
        <ImageContainer>
          <MyImage />
        </ImageContainer>
        <InfoContainer>
          <header>{user.username ? user.username : null}</header>
          <p>{user.address ? user.address : null}</p>
        </InfoContainer>
      </MyInfoContainer>
      <hr />
      <MyNftListContainer>
        {myNftList.length !== 0 ? (
          <MyNftList myNftList={myNftList} />
        ) : (
          <NoData />
        )}
      </MyNftListContainer>
    </MyPageContainer>
  );
};

export default Mypage;
