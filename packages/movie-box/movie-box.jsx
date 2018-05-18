const React = require('react');
const PropTypes = require('prop-types');
import Na from 'mini-movie/No_Image_Available.png';

const propTypes = {  
  description: PropTypes.object.isRequired,
  deleteBookmark: PropTypes.func.isRequired,  
};

class MovieBox extends React.Component{

    constructor(props){
        super(props);   

        this.showMovie = this.showMovie.bind(this); 
    }

    showMovie(e){
      console.log(e.target);
    }

    render() {
      const { deleteBookmark } = this.props;
      let { Title, Genre, Runtime, Year, Poster, imdbID, Country, Ratings } = this.props.description;

      if (Poster==="N/A") Poster = Na;

    	return(
    		<div className="movie-box" style={{backgroundImage: `url(${Poster})`}}>	
          <div className="movie-box__title">{Title} ({Year})</div>
          <div className="movie-box__info">{Genre} | {Runtime}</div>
          <button className="movie-box__close btn" onClick={deleteBookmark.bind(null, imdbID)}>X</button>
          <div className="movie-box__watch btn" onClick={this.showMovie}></div>  
			  </div>
    	);
    }
 }   
  
MovieBox.propTypes = propTypes;

module.exports = MovieBox;
