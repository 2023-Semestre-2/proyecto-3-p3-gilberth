import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext'; // Ajusta la ruta según la ubicación de tu AuthContext

import Navbar from './components/navbar/navbar';
import MainPage from './pages/mainpage/MainPage';
import Login from './pages/login/Login';


import Footer from './components/footer/footer';



function App() {
  return (
    <Router>
      <AuthProvider>
        <div className='container'>
          <Navbar />
          <Routes>
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
        <Footer/>
      </AuthProvider>
    </Router>
  );
}

export default App;
