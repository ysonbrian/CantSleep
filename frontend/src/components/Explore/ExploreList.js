import React from 'react';
import { useNftData, useLoading } from '../../utils/store';
import styled from 'styled-components';
import ExploreListItem from './ExploreListItem';
const ExploreListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  gap: 10px;
`;

const ExploreList = () => {
  const [nftList, setNftList] = useNftData((state) => [
    state.nftList,
    state.setNftList,
  ]);
  return (
    <ExploreListContainer>
      {nftList?.map((data) => (
        <ExploreListItem data={data} />
      ))}
    </ExploreListContainer>
  );
};

export default ExploreList;
