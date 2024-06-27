import './stylesheets/App.css'
import MoviesMain from './components/MoviesMain'
import SearchBar from './components/SearchBar'
import { Route, Routes } from 'react-router-dom'
import SearchPage from './components/SearchPage'
import { useState } from 'react'


const Home = () =>{
  return(
    <div className='brackground-home'>
      <h1>Home</h1>
      <MoviesMain/>
    </div>
  );
}


function App() {
  return (
    <div className='App'>
      <header>
        <nav>
        </nav>
      </header>
    <SearchPage></SearchPage>
    </div>
  )
}

export default App
