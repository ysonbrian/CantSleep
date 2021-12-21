import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiFillEdit, AiFillHome } from 'react-icons/ai';
const Nav = () => {
  const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin: 20px;
  `;
  const NavLogoDiv = styled.div`
    display: flex;
    gap: 10px;
    a {
      text-decoration: none;
      cursor: pointer;
      color: black;
    }
    img {
      width: 100px;
      height: 100px;
    }
  `;

  const NavBar = styled.ul`
    display: flex;
    gap: 20px;
    a {
      text-decoration: none;
      color: black;
      cursor: pointer;
    }

    li {
      list-style: none;
      text-decoration: none;
    }
  `;

  return (
    <NavContainer>
      <NavLogoDiv>
        <Link to="/">
          <AiFillHome />
        </Link>
        <p>CantSleep</p>
      </NavLogoDiv>
      <NavBar>
        <Link to="/login">
          <li>로그인</li>
        </Link>
        <Link to="/register">
          <li>회원가입</li>
        </Link>
        <Link to="/create">
          <li>
            <AiFillEdit />
          </li>
        </Link>
      </NavBar>
    </NavContainer>
  );
};

export default Nav;
