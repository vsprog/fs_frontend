const React = require('react');
const PropTypes = require('prop-types');
import Na from 'mini-movie/No_Image_Available.png';

const propTypes = {  
  description: PropTypes.object.isRequired,
  deleteBookmark: PropTypes.func.isRequired,  
  showMovie: PropTypes.func.isRequired,
};

class MovieBox extends React.Component{

    constructor(props){
        super(props); 
        this.state = {class: "movie-box"};
    }

    toggleClass(e){
      if (this.state.class === "movie-box"){
        this.setState({class: "movie-box twirl"});
      } else {
        this.setState({class: "movie-box"});
      }
    }

    render() {
      const { deleteBookmark, showMovie } = this.props;
      let { Title, Genre, Runtime, Year, Poster, imdbID, Country, Ratings, Plot } = this.props.description;

      if (Poster==="N/A") Poster = Na;

    	return(
        <div className={this.state.class}>
          <div className="movie-box__front" style={{backgroundImage: `url(${Poster})`}}>
            <div className="movie-box__title" onMouseLeave={this.toggleClass.bind(this)} onMouseEnter={this.toggleClass.bind(this)}>{Title} ({Year})</div>
            <div className="movie-box__info">{Genre} | {Runtime}</div>
            <button className="movie-box__close btn" onClick={deleteBookmark.bind(null, imdbID)}>X</button>
            <div className="movie-box__watch btn" onClick={showMovie.bind(null, imdbID)}></div> 
          </div>
          <div className="movie-box__back">
            <div className="movie-box__plot">{Plot}</div>
          </div>
        </div>  		
    	);
    }
 }   
  /*
<div className="movie-box" style={{backgroundImage: `url(${Poster})`}} >  
  <div className="movie-box__title">{Title} ({Year})</div>
  <div className="movie-box__info">{Genre} | {Runtime}</div>
  <button className="movie-box__close btn" onClick={deleteBookmark.bind(null, imdbID)}>X</button>
  <div className="movie-box__watch btn" onClick={showMovie.bind(null, imdbID)}></div>  
</div>
  */


MovieBox.propTypes = propTypes;

module.exports = MovieBox;
