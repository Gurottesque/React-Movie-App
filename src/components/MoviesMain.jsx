
import { useState, useEffect } from 'react'
import { MovieApi } from './MovieApi';
import { Link } from 'react-router-dom'
import '../stylesheets/MoviesMain.css'

const MoviesMain = () => {
    const[content, setContent] = useState();
    const[index, setIndex] = useState(1);

    useEffect(() => {
        const fetchContent = async () => {
            const contentData = await MovieApi.getData(`trending/all/day`,'','');
            setContent(contentData.results);
            console.log(contentData.results);
        };
        fetchContent();
    },[])

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + content.length) % content.length);
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % content.length);
    };

    return(
        <div className='movies-main-container'>
            <button className='nav-button prev' onClick={handlePrev}><img src="./flecha-izq.svg" alt="" /></button>
            {content && (
                <>
                <Link to={`/details/${content[index].seasons? 'tv':'movie'}/${content[index].id}`} className='movie-link'>
                <div className='contenedor-img'>
                    <img 
                        className='movies-main-img'
                        src={MovieApi.getImage(content[index].backdrop_path)} 
                        alt={content[index].title} 
                    />
                    <div className='movie-info'>
                        <button className='add-button'>+</button>
                        <img className='movie-card' src={MovieApi.getImage(content[index].poster_path)} alt={content[index].title} />
                        <img className='imagen-play'src='/play2.svg'/>
                        <div className='movie-details'>
                            <h2>{content[index].title}</h2>
                            <p>Watch the Trailer</p>
                        </div>
                    </div>
                </div>
                </Link>
                </>
            )}
            <button className='nav-button next' onClick={handleNext}><img src="./flecha-der.svg" alt="" /></button>
        </div>
    )

}

export default MoviesMain