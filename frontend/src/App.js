import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Create from './components/Create/Create';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import MainListItem from './components/Main/MainListItem';
import Nav from './components/Nav/Nav';
import Register from './components/Register/Register';

function App() {
  const [writingList, setWritingList] = useState([]);
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<MainListItem />} />
      </Routes>
    </Router>
  );
}

export default App;
