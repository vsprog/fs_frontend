const React = require('react');
import Na from '../mini-movie/No_Image_Available.png';

class MiniMovie extends React.Component{
             
    constructor(props){
        super(props);     
    }
                              
    render() {
    	let { Title, Year, Poster, imdbID } = this.props.objMovie;	
    	if (Poster==="N/A") Poster = Na;
      return (
      	<div className="mini-movie" onClick={this.props.uploadMovie.bind(null, imdbID)}>
      		<img src = {Poster} align='middle' alt='poster' />
      		<div className="mini-movie__title">{Title}</div>
      		<div className="mini-movie__year">{Year}</div>
      	</div>
      );
    }
}

module.exports = MiniMovie;