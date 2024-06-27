import './stylesheets/App.css';
import SearchBar from './components/SearchBar';

import { Link, Route, Routes } from 'react-router-dom';
import {Home} from './components/Home';
import MoviesMain from './components/MoviesMain';

function App() {
  return (
    <div className='App'>
      <header className='header'>
        <nav>
          <div className='logo' >
            <Link to = '/'> 
              <img className='logo-img' src='https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg' alt='IMBD Logo' />
            </Link>
          </div>
          <SearchBar/>
        </nav>
      </header>
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/search' />
      </Routes>    
      <MoviesMain />
    </div>
  )
}

export default App
