import './stylesheets/App.css'
import MoviesMain from './components/MoviesMain'
import SearchBar from './components/SearchBar'
import SearchPage from './components/SearchPage'
import { useState } from 'react'

const Home = () =>{
  return(
    <div>
      <h1>Home</h1>
    </div>
  );
}

function App() {
  const [inSearchPage, setinSearchPage] = useState(false)

  return (
    <div className='App'>
      <header>
        <nav>
          <SearchPage />
        </nav>
      </header>
      <SearchPage />
    </div>
  )
}

export default App
