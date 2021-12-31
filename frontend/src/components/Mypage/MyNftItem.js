import React from 'react';
import styled from 'styled-components';
import { BiCube } from 'react-icons/bi';
import { AiOutlineFileSearch } from 'react-icons/ai';

import testImg from '../../image/MainLeft.jpg';

const MyNftItemContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  height: 100%;

  border: 1px solid rgb(206, 202, 202);
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;

  :hover {
    cursor: pointer;
    box-shadow: 0px 0px 5px rgb(102, 100, 100);
    overflow: hidden;
    transform: translateY(-6px);
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: contain;
  width: 100%;
  height: 400px;
  /* padding: 5px; */
`;
const Image = styled.img`
  /* width: 100%;
  height: 100%; */
  /* max-height: 278px; */
  max-width: 100%;
  max-height: 100%;
  /* border-radius: 10px 10px 0 0; */
`;

const ItemDiscriptionDiv = styled.div`
  display: flex;
  padding: 15px;
  color: #353840;
  background-color: #ffffff;
`;

const ItemNameDisDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemIPFSContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
  a:hover {
    color: black;
  }
`;

const ItemIPFSInfo = styled.a`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: #6d6d6d;
  gap: 5px;
  a:hover {
    color: black;
  }
  margin: 0 auto;
`;

const MyNftItem = ({ data }) => {
  return (
    <MyNftItemContainer>
      <ImageContainer>
        <Image src={data?.imgURI ? data?.imgURI : testImg} />
      </ImageContainer>

      <ItemDiscriptionDiv>
        <ItemNameDisDiv>
          <div style={{ color: '#7B848C' }}>{data?.name}</div>
          <div>{data?.description}</div>
        </ItemNameDisDiv>
      </ItemDiscriptionDiv>
      <hr />
      <ItemIPFSContainer>
        <ItemIPFSInfo
          href={data?.tokenURI ? data?.tokenURI : null}
          target="_blank"
        >
          <BiCube />
          메타데이터
        </ItemIPFSInfo>
        <ItemIPFSInfo href={data?.imgURI ? data?.imgURI : null} target="_blank">
          <AiOutlineFileSearch />
          IPFS
        </ItemIPFSInfo>
      </ItemIPFSContainer>
    </MyNftItemContainer>
  );
};

export default MyNftItem;
