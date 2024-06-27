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
  const [inSearchPage, setinSearchPage] = useState(false)

  return (
    <div className='App'>
      <header>
        <nav>
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
