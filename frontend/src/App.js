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
  return (
    <Router>
      <Nav />
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
    </Router>
  );
}

export default App;
