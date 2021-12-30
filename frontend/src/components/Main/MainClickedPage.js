import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const ClickedItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  font-size: 1rem;
  line-height: 2.5rem;
  margin: 100px;
  height: 100vh;
  padding: 0 5%;
  a {
    cursor: pointer;
    font-size: 40px;
    color: black;
    justify-content: ;
  }
  background-color: #ffffff;
`;

const ClickedItemTitle = styled.p`
  font-size: 40px;
  padding: 30px;
  width: 100%;
  text-align: center;
`;

const ClickedItemContent = styled.p`
  text-align: left;
  font-size: 20px;
  padding: 30px;
  width: 100%;
`;
const ClickedBackButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 60px;
`;
const ClickedBackButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  outline: none;
  padding: 0px 1.25rem;
  text-align: center;
  width: 150px;
  height: 30px;
  margin-left: 10px;
  :hover {
    background-color: #f4f4f4;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: black;
  }

  p {
    font-size: 20px;
  }
`;

const MainClickedPage = ({ clickedItem }) => {
  const info = `# ${clickedItem.title}
  \
  \

  ${clickedItem.content}
  \
  \

  \
  \

  `;

  return (
    <ClickedItemContainer>
      <ClickedBackButtonContainer>
        <ClickedBackButton>
          <Link to="/">
            <BiArrowBack size={25} />
            <p>나가기</p>
          </Link>
        </ClickedBackButton>
      </ClickedBackButtonContainer>

      <ClickedItemTitle>{clickedItem.title}</ClickedItemTitle>
      <ClickedItemContent>{clickedItem.content}</ClickedItemContent>
    </ClickedItemContainer>
  );
};

export default MainClickedPage;
