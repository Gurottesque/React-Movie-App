import './stylesheets/App.css'
import MoviesMain from './components/MoviesMain'
import SearchBar from './components/SearchBar'

const Home = () =>{
  return(
    <div className='brackground-home'>
      <h1>Home</h1>
      <MoviesMain/>
    </div>
  );
}

const SearchPage = () =>{
  return(
    <div>
      <h1>Search Page</h1>
    </div>
  );
}

const Description = () =>{
  return(
    <div>
      <h1>Description</h1>
    </div>
  );
}

function App() {
  return (
    <div className='App'>
      <header>
        <nav>
          <SearchBar/>
        </nav>
      </header>
      <Routers>
        <Route path = '/' element = {<Home/>}> </Route>;
        <Route path = '/search' element = {<SearchPage/>}> </Route>;
        <Route path = '/description' element = {<Description/>}> </Route>;
      </Routers>
    </div>
  )
}

export default App
