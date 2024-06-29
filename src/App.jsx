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
        <Route path = '/details/:type/:id' element={<Details/>} />
      </Routes>
      <footer className='footer'>
        <div className='footer-container'>
          <div className='condiciones'>
            <p>Ayuda</p>
            <p>Indice del sitio</p>
            <p>Condiciones de uso</p>
            <p>Politicas de privacidad</p>
          </div>
          <div className='authors'>
            <h3>Autores:</h3>
            <p>Angel Andres Bedoya</p>
            <p>David Londoño</p>
            <p>Nicolas Vega</p>
            <p>Juan Gomeez</p>
          </div>
          <p className='bootcamp'><strong>EliteStacks</strong></p>
        </div>
      </footer>    
    </div>
  )
}

export default App
