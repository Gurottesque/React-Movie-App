import MoviesMain from './MoviesMain'
import Recommendations from './Recommendations';
import '../stylesheets/Home.css'

const Home = () =>{
    return(
      <div className='brackground-home'>
        <MoviesMain/>
        <div className='carrousel-div'>
          <h2>Top 10 en IMDb de esta semana</h2>
          <Recommendations />
        </div>
      </div>
    );
}

export default Home