import './stylesheets/App.css';
import SearchBar from './components/SearchBar';
import { Link, Route, Routes } from 'react-router-dom';
import {Home} from './components/Home';

function App() {
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
        <Route path = '/' element = {<Home/>} />
        <Route path = '/search' />
      </Routes>    
    </div>
  )
}

export default App
