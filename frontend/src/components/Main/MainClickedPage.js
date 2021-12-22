import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
const MainClickedPage = ({ clickedItem }) => {
  const ClickedItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 1rem;
    line-height: 2.5rem;
    width: 100%;
    height: 100%;
    a {
      cursor: pointer;
      font-size: 40px;
      color: black;
      justify-content: ;
    }
  `;

  const ClickedItemTitle = styled.p`
    font-size: 40px;
    padding: 30px;
  `;

  const ClickedItemContent = styled.p`
    font-size: 15px;
    padding: 30px;
  `;

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
      {/* <ReactMarkdown
        parserOptions={{ commonmark: true }}
        children={info}
        remarkPlugins={[remarkGfm]}
      /> */}
      <div>
        <Link to="/">
          <BiArrowBack position="left" />
        </Link>
      </div>

      <ClickedItemTitle>{clickedItem.title}</ClickedItemTitle>
      <ClickedItemContent>{clickedItem.content}</ClickedItemContent>
    </ClickedItemContainer>
  );
};

export default MainClickedPage;
