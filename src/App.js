import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
// import UserDetailPage from './pages/UserDetailPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/user/:id" element={<UserDetailPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
