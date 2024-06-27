import './App.css';
import SearchBar from './components/SearchBar';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SearchPage from './components/SearchPage';
import Details from './components/Details';

function App() {
  return (
    <div className='App'>
      <header className='header'>
        <nav className='header-nav'>
            <Link to = '/'> 
              <img className='logo-img' src='https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg' alt='IMBD Logo' />
            </Link>
          <div className='menu'>
            <img className='menu-icon' src="/bars-solid.svg" alt="menu" />
          </div>
          <SearchBar/>
        </nav>
      </header>
      <Routes>
        <Route path = '/' element = {<Home/>} /> 
        <Route path = '/search' element = {<SearchPage />}/>

        <Route path = '/details' element={<Details id = '603'/>} />
      </Routes>    
    </div>
  )
}

export default App
