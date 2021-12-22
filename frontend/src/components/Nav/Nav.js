import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiFillEdit, AiFillHome } from 'react-icons/ai';
import logo from '../../image/logo2.svg';
const Nav = () => {
  const NavContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    font-family: 'Roboto', sans-serif;
    background-color: #fefefe;
    @media (max-width: 1200px) {
      grid-template-columns: 4fr 1fr 4fr;

      ul {
        padding: 0;
      }
    }
  `;
  const NavLogoDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    gap: 10px;
    a {
      text-decoration: none;
      cursor: pointer;
      color: #00406e;
      font-size: 20px;
    }
    a:hover {
      color: black;
    }
    img {
      width: 50px;
      height: 50px;
    }
    img:hover {
      color: black;
    }
  `;

  const NavBar = styled.ul`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    padding: 10px;
    a {
      text-decoration: none;
      color: black;
      cursor: pointer;
    }
    a:hover {
      color: #05b388;
    }

    li {
      list-style: none;
      text-decoration: none;
    }
    @media (max-width: 1200px) {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0;
      a {
        font-size: 13px;
      }
      input {
        height: 32px;
      }
      ul {
        padding: 0;
        justify-content: center;
      }
      li {
        text-align: center;
        width: 50px;
      }
    }
  `;

  const NavInput = styled.input`
    font-size: 16px;
    border-radius: 25px;
    height: 42px;
    outline: none;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 0 5px rgb(109 207 246 / 50%);
    padding-left: 2rem;
    padding-right: 2.5rem;
    cursor: auto;
    border: none;
    :hover {
      transition: all 0.2s ease-in-out;
      background-color: #05b388;
      color: white;
      ::placeholder {
        color: white;
      }
    }
  `;

  return (
    <NavContainer>
      <NavLogoDiv>
        <Link to="/">
          <img src={logo} />
        </Link>
        <Link to="/">CantSleep</Link>
      </NavLogoDiv>
      <div></div>
      <NavBar>
        <NavInput type="text" placeholder="검색" />
        <Link to="/login">
          <li>로그인</li>
        </Link>
        <Link to="/register">
          <li>회원가입</li>
        </Link>
        <Link to="/create">
          <li>
            <AiFillEdit size={30} />
          </li>
        </Link>
      </NavBar>
    </NavContainer>
  );
};

export default Nav;
