
const Preview = ({ images }) => {
    return(
        <div className='movies-main-container'>
            <img 
                className='movies-main-img'
                src={images[imageIndex]} 
                alt="movie-img" 
            />
        </div>
    )
}
