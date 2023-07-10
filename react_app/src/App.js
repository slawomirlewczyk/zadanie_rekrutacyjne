import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Items from './pages/Items';

function App() {
  const token = localStorage.getItem('accessToken');

  if(!token) {
    return <Login />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/items" element={<Items/>}/>
          <Route path="/" element={<Items/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
