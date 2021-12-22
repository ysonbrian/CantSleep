import React, { useEffect, useState } from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
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
import { createBrowserHistory } from 'history';
import { getCurrentUser, logout, parseJwt } from './utils/auth';
import { useStore } from './utils/store';

function App() {
  const [writingList, setWritingList] = useState([]);
  const [clickedItem, setClickedItem] = useState('');
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);

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
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
  `;
  const AppMainLeft = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%;
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
    width: 100%;
    img {
      width: 100%;
      height: 500px;
    }
  `;

  let history = createBrowserHistory();
  history.listen((location, action) => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log("토큰 만료 검사");

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
        setUser({});
      }
    }
  });

  useEffect(() => {
    const user = getCurrentUser();
    console.log(user);
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <HistoryRouter history={history}>
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
          <Route path="/create" element={<Create getWriting={getWriting} />} />
          <Route
            path={`/list/${clickedItem.id}`}
            element={<MainClickedPage clickedItem={clickedItem} />}
          />
        </Routes>
        <AppMainRight>
          <img src={MainRight} alt="" />
        </AppMainRight>
      </AppMainContainer>
    </HistoryRouter>
  );
}

export default App;
