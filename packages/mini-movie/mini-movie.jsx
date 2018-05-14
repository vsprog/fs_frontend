const React = require('react');
const PropTypes = require('prop-types');
const { apiKey, plot } = require('core/constants.js').omdbapi;
import Na from '../mini-movie/No_Image_Available.png';

const propTypes = {
  uploadMovie: PropTypes.func.isRequired,
  objMovie: PropTypes.object.isRequired,
};

class MiniMovie extends React.Component{
             
    constructor(props){
        super(props);          
    }

    uploadHandler(id, e){    	
    	fetch(`http://www.omdbapi.com/?i=${id}&plot=${plot}&apiKey=${apiKey}`)
      .then(response => {
        if(response.ok) return response.json();
        else {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then(result => {
        console.log(result);
        this.props.uploadMovie(result);
      })
      .catch(error => console.log(error));   
    }
                              
    render() { 
    	let { Title, Year, Poster, imdbID } = this.props.objMovie;  
    	if (Poster==="N/A") Poster = Na;
      return (
      	<div className="mini-movie" onClick={this.uploadHandler.bind(this, imdbID)}>
      		<img src = {Poster} align='middle' alt='poster' className="mini-movie__poster"/>
      		<div className="mini-movie__title">{Title}</div>
      		<div className="mini-movie__year">{Year}</div>
      	</div>
      );
    }
}

MiniMovie.propTypes = propTypes;

module.exports = MiniMovie;