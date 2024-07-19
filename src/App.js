import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Note from './components/Note';
import Record from './components/Record';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute element={Note} />} />
        <Route path="/record" element={<ProtectedRoute element={Record} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;



