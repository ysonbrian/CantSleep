import React, { useEffect, useState } from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Create from './components/Create/Create';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import MainClickedPage from './components/Main/MainClickedPage';
import Nav from './components/Nav/Nav';
import Register from './components/Register/Register';

import styled from 'styled-components';

import MainLeft from './image/MainLeft.svg';
import MainRight from './image/MainRight.svg';
import { createBrowserHistory } from 'history';
import { getCurrentUser, logout, parseJwt } from './utils/auth';
import { getAllUsersWList, getMyNftList } from './utils/data';
import {
  useStore,
  useData,
  useLoading,
  useMyNftList,
  useClickedItem,
} from './utils/store';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import CreateNFT from './components/Create/CreateNFT';
import Explore from './components/Explore/Explore';
import Mypage from './components/Mypage/Mypage';
import Footer from './components/Footer/Footer';

const AppMainContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr;
  background-color: #f4f4f4;
`;

const AppMainMiddle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [writingList, setWritingList] = useData((state) => [
    state.writingList,
    state.setWritingList,
  ]);
  const [clickedItem, setClickedItem] = useClickedItem((state) => [
    state.clickedItem,
    state.setClickedItem,
  ]);
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  const [isLoading, setIsLoading] = useLoading((state) => [
    state.isLoading,
    state.setIsLoading,
  ]);

  const [myNftList, setMyNftList] = useMyNftList((state) => [
    state.myNftList,
    state.setMyNftList,
  ]);

  const getWriting = (data) => {
    setWritingList((prev) => {
      return [data, ...prev];
    });
  };
  const onClickedItem = (data) => {
    setClickedItem(data);
    console.log('App', clickedItem);
  };

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
    if (user) {
      setUser(user);
    }
    console.log(user);
  }, [setUser]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { data } = await getAllUsersWList();
      const orderData = data.reverse();
      setWritingList(orderData);
      setIsLoading(false);
    }

    fetchData();
  }, [setIsLoading, setWritingList]);

  useEffect(() => {
    async function fetchMyData() {
      const { data } = await getMyNftList(user);
      if (data) {
        setMyNftList(data);
      } else {
        setMyNftList(null);
      }
    }
    fetchMyData();
  }, [setMyNftList, user]);

  return (
    <HistoryRouter history={history}>
      <Nav />
      <AppMainContainer>
        {isLoading ? (
          <AppMainMiddle>
            <Loader
              type="ThreeDots"
              color="#000000"
              height={100}
              width={100}
              timeout={3000000}
            />
          </AppMainMiddle>
        ) : (
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main writingList={writingList} onClick={onClickedItem} />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create"
              element={<Create getWriting={getWriting} />}
            />
            <Route path="/createNFT" element={<CreateNFT />} />
            <Route
              path={`/list/${clickedItem?.id}`}
              element={<MainClickedPage clickedItem={clickedItem} />}
            />
            <Route path="/explore" element={<Explore />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        )}

        <Footer />
      </AppMainContainer>
    </HistoryRouter>
  );
}

export default App;
