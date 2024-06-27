import './stylesheets/App.css';
import {SearchBar} from './components/SearchBar';
import { Link, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import { useState } from 'react';
import {Home} from './components/Home';

function App() {
  const [inSearchPage, setinSearchPage] = useState(false)

  return (
    <div className='App'>
      <header className='header'>
        <nav>
          
          <div className='logo' >
            <Link to = '/'> 
              <img src = 'https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg' alt = 'Netflix Logo' />
            </Link>
          </div>
          <SearchBar/>
        </nav>
      </header>
      <Routes>
        <Route path = '/' element = {<Home/>}> </Route>;
        <Route path = '/search' element = {<SearchPage/>}> </Route>;
        <Route path = '/description' element = {<Description/>}> </Route>;
      </Routes>

    </div>
  )
}

export default App
