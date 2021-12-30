import React from 'react';
import { useNftData, useLoading } from '../../utils/store';
import styled from 'styled-components';
import ExploreListItem from './ExploreListItem';
const ExploreListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  width: 100%;
  gap: 10px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    font-size: 14px;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    font-size: 12px;
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
