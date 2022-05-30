import React from 'react'
import Header from './components/Header'
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Trending from './pages/trending/Trending';
import Search from './pages/search/Search';
import Movies from './pages/movies/Movies';
import Tvseries from './pages/tvseries/Tvseries';


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <div className='App'>
      <Container>
        <Routes>
          <Route path="/"  exact element={<Trending/>} />
          <Route path="/Movies" element={<Movies/>} />
          <Route path="/Tvseries" element={<Tvseries/>} />
          <Route path="/Search" element={<Search/>} />
        </Routes>
      </Container>
      <Navbar/>
      
    </div>
    </BrowserRouter>
    </>
  )
}

export default App