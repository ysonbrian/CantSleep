import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getNftList } from '../../utils/data';
import { useNftData, useLoading } from '../../utils/store';
import ExploreList from './ExploreList';
const ExploreContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
`;

const ExploreHeader = styled.div`
  font-size: 40px;
  font-weight: 600;
`;

const ItemListContainer = styled.div`
  margin-top: 20px;
`;

const Explore = () => {
  const [nftList, setNftList] = useNftData((state) => [
    state.nftList,
    state.setNftList,
  ]);
  const [isLoading, setIsLoading] = useLoading((state) => [
    state.isLoading,
    state.setIsLoading,
  ]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getNftList();
      setNftList(data);
      console.log(nftList);
    }
    fetchData();
  }, []);

  return (
    <ExploreContainer>
      <HeaderContainer>
        <ExploreHeader>NFT 상품</ExploreHeader>
      </HeaderContainer>
      <ItemListContainer>
        <ExploreList nftList={nftList} />
      </ItemListContainer>
    </ExploreContainer>
  );
};

export default Explore;
