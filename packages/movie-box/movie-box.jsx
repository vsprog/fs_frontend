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

    hover(e){       
      this.setState({class: "movie-box down"});              
    }

    leave(e){    
      this.setState({class: "movie-box up"});      
    }  

    render() {
      const { deleteBookmark, showMovie } = this.props;
      let { Title, Genre, Runtime, Year, Poster, imdbID, Country, Ratings } = this.props.description;

      if (Poster==="N/A") Poster = Na;

    	return(
    		<div className={this.state.class} style={{backgroundImage: `url(${Poster})`}} onMouseLeave={this.leave.bind(this)} onMouseEnter={this.hover.bind(this)}>	
          <div className="movie-box__title">{Title} ({Year})</div>
          <div className="movie-box__info">{Genre} | {Runtime}</div>
          <button className="movie-box__close btn" onClick={deleteBookmark.bind(null, imdbID)}>X</button>
          <div className="movie-box__watch btn" onClick={showMovie.bind(null, imdbID)}></div>  
			  </div>
    	);
    }
 }   
  
MovieBox.propTypes = propTypes;

module.exports = MovieBox;
