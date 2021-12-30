import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const FooterUnOrderList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  list-style: none;
  a {
    color: #000000;
  }
  a:hover {
    opacity: 0.7;
  }
`;

const Footer: FunctionComponent = function () {
  return (
    <FooterWrapper>
      <FooterUnOrderList>
        <li>
          <a
            href="https://github.com/codestates/BEB_01_CantSleep"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size="30px" />
          </a>
        </li>
      </FooterUnOrderList>
      <br />
      <div> ©BEB-01-CANTSLEEP • 2022</div>
    </FooterWrapper>
  );
};

export default Footer;
