import MoviesMain from './MoviesMain'
import Carrusel1 from './Carrusel1'
import '../stylesheets/Home.css'
import Footer from '../components/Footer'

const Home = () =>{
    return(
      <div className='brackground-home'>
        <MoviesMain/>
        <div className='carrousel-div'>
          <h2>Top 10 en IMDb de esta semana</h2>
          <Carrusel1 tipo={"movie"}/>
          <h2>Top 10 en Tv Show IMDb de esta semana</h2>
          <Carrusel1 tipo={"tv"}/>
          <h2>Top 10 Famosos IMDb de esta semana</h2>
          <Carrusel1 tipo={"person"}/>
          <Footer/>
        </div>
      </div>
    );
}

export default Home