import './stylesheets/App.css';
import SearchBar from './components/SearchBar';
import { Link } from 'react-router-dom';
import MoviesMain from './components/MoviesMain';
import './App.css'

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
      <MoviesMain />
    </div>
  )
}

export default App
