const React = require('react');
const PropTypes = require('prop-types');
import Na from '../mini-movie/No_Image_Available.png';

const propTypes = {
  description: PropTypes.object.isRequired,
};


class FullMovie extends React.Component{
             
    constructor(props){
        super(props);  
        this.state={left: 0};   

        this.move = this.move.bind(this);        
        this.show = this.show.bind(this); 

    }

    move(e){      
      this.setState({ left: "1210px" });
    }

    show(){
      this.setState({ left: 0 });
    }

    render() {
    	let { Title, Year, Poster, Genre, Plot, Runtime, imdbID, Actors, Director, Writer, Country, Metascore, imdbRating } = this.props.description;	    	      
      
      if (Poster==="N/A") Poster = Na;
      return (
      	<div className="full-movie" style={{left: this.state.left}}>
      		<div className="full-movie__container">
            <div className="full-movie__title">{Title}</div>
            <img src = {Poster} align='middle' alt='poster' className="full-movie__poster" />
            <div className="full-movie__plot">{Plot}</div>
          </div>
          <button className="full-movie__button" onClick={this.move} >-></button>
      	</div>
      );
    }
}

FullMovie.propTypes = propTypes;

module.exports = FullMovie;