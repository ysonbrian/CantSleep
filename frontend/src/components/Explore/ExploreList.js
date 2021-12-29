import React from 'react';
import { useNftData, useLoading } from '../../utils/store';
import styled from 'styled-components';
import ExploreListItem from './ExploreListItem';
const ExploreListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  gap: 10px;
  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    font-size: 14px;
  }
`;

const ExploreList = () => {
  const [nftList, setNftList] = useNftData((state) => [
    state.nftList,
    state.setNftList,
  ]);
  return (
    <ExploreListContainer>
      {nftList?.map((data) => (
        <ExploreListItem key={data.id} data={data} />
      ))}
    </ExploreListContainer>
  );
};

export default ExploreList;
