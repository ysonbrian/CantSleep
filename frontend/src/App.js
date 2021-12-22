import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Create from './components/Create/Create';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import MainClickedPage from './components/Main/MainClickedPage';
import MainListItem from './components/Main/MainListItem';
import Nav from './components/Nav/Nav';
import Register from './components/Register/Register';

import styled from 'styled-components';

import MainLeft from './image/MainLeft.svg';
import MainRight from './image/MainRight.svg';

function App() {
  const [writingList, setWritingList] = useState([]);
  const [clickedItem, setClickedItem] = useState('');
  const getWriting = (data) => {
    setWritingList((prev) => {
      return [data, ...prev];
    });
  };
  const onClickedItem = (data) => {
    setClickedItem(data);
    console.log('App', clickedItem);
  };
  const AppMainContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    height: 100vh;
    background-color: #f4f4f4;
  `;
  const AppMainLeft = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    img {
      width: 100%;
      height: 500px;
    }
  `;

  const AppMainRight = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    img {
      width: 100%;
      height: 500px;
    }
  `;
  return (
    <div>
      <Router>
        <Nav />
        <AppMainContainer>
          <AppMainLeft>
            <img src={MainLeft} alt="" />
          </AppMainLeft>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main writingList={writingList} onClickedItem={onClickedItem} />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create"
              element={<Create getWriting={getWriting} />}
            />
            <Route
              path={`/list/${clickedItem.id}`}
              element={<MainClickedPage clickedItem={clickedItem} />}
            />
          </Routes>
          <AppMainRight>
            <img src={MainRight} alt="" />
          </AppMainRight>
        </AppMainContainer>
      </Router>
    </div>
  );
}

export default App;
