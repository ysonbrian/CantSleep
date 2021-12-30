import React from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FaEthereum } from 'react-icons/fa';
import { BiCube } from 'react-icons/bi';
import { AiOutlineFileSearch } from 'react-icons/ai';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  /* overflow: hidden; */
  border: 1px solid rgb(206, 202, 202);
  border-radius: 10px;
  :hover {
    box-shadow: 0px 0px 5px rgb(102, 100, 100);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 10px 0 0;
`;

const ItemDiscriptionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  color: #353840;
  background-color: #ffffff;
`;

const PriceContainerDiv = styled.div`
  display: flex;
`;

const ItemNameDisDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemFooter = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  font-weight: 500;
  height: 42px;
  width: 100%;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: linear-gradient(
    rgba(229, 232, 235, 0.392) 0%,
    rgb(255, 255, 255) 20%
  );
`;
const ItemPriceHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemBuyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 28px;
  margin-top: 5px;
  border-radius: 4px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: #05b388;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  margin-right: 10px;
  letter-spacing: 1px;
  :hover {
    opacity: 0.7;
  }
`;

const ItemIPFSContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px;
  background-color: #ffffff;
  a:hover {
    color: black;
  }
`;

const ItemIPFSInfo = styled.a`
  display: flex;
  text-decoration: none;
  color: #6d6d6d;
  a:hover {
    color: black;
  }
`;

const ExploreListItem = ({ data }) => {
  console.log(data.imageURI);

  const onClickBuy = () => {
    console.log('test');
  };

  return (
    <ListContainer>
      <Image src={data.imgURI} />
      <ItemDiscriptionDiv>
        <ItemNameDisDiv>
          <div style={{ color: '#7B848C' }}>{data.name}</div>
          <div>{data.description}</div>
        </ItemNameDisDiv>
        <div>
          <ItemPriceHeader>가격</ItemPriceHeader>
          <PriceContainerDiv>
            <FaEthereum />
            <p>30</p>
          </PriceContainerDiv>
        </div>
      </ItemDiscriptionDiv>
      <hr />
      <ItemIPFSContainer>
        <ItemIPFSInfo
          href={data.tokenURI ? data.tokenURI : null}
          target="_blank"
        >
          <BiCube />
          View metadata
        </ItemIPFSInfo>
        <ItemIPFSInfo href={data.imgURI ? data.imgURI : null} target="_blank">
          <AiOutlineFileSearch />
          View on IPFS
        </ItemIPFSInfo>
      </ItemIPFSContainer>
      <ItemFooter>
        <ItemBuyButton onClick={onClickBuy}>품절</ItemBuyButton>
      </ItemFooter>
    </ListContainer>
  );
};

export default ExploreListItem;
