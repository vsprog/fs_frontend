const React = require('react');
const PropTypes = require('prop-types');
const { Link } = require('react-router-dom');
const createRequest = require('core/create-request');
const Rating = require('rating/rating');
import star from './mark.png';
import star_active from './mark_active.png';
import Na from 'mini-movie/No_Image_Available.png';

const propTypes = {
  description: PropTypes.object.isRequired,  
  toggleMark: PropTypes.func.isRequired,
};

class FullMovie extends React.Component{

    constructor(props){
        super(props);
        this.state={class: "fixed-container hide", markImg: star };

        this.toggleView = this.toggleView.bind(this);
    }

    componentDidMount(){
//      this.setState({class: "fixed-container show"});
    }

    toggleView(e){
      if (this.state.class === "fixed-container hide") { 
        this.setState({ class: "fixed-container show" }); 
      } else{
        this.setState({ class: "fixed-container hide" });
      }
    }

    onStar(){
      this.setState({ markImg: star_active});
    }

    offStar(){
      this.setState({ markImg: star});
    }

    render() {
    	let { Title, Released, Poster, Genre, Plot, Runtime, imdbID, Actors, Director, Writer, Country, Ratings } = this.props.description;
      let { toggleMark } = this.props;

      //иначе будет пытаться загрузить изображения из localhost/search/s
      let path = location.href;
      path = path.slice(0, path.search(/search|bookmark/g));

      if (Poster==="N/A") Poster = path + Na;
      return (
      <div className={this.state.class}>
        <div className="full-movie">
          <div className="full-movie__container">
            <div className="full-movie__title">{Title}</div>
            <div className="full-movie__info">
              {Genre} | {Runtime} | {Released} ({Country})
            </div>
          <button className="full-movie__close button" onClick={this.toggleView}>X</button>
          <img onClick={toggleMark.bind(null, this.props.description)} className="full-movie__bookmark button" src={path + this.state.markImg} align='middle' alt='mark' />
          <img src = {Poster} align='middle' alt='poster' className="full-movie__poster" />
          <div className="full-movie__plot">{Plot}</div>
          {
            Ratings.map(rating => <Rating key={rating.Value} rate={rating} />)
          }          
          <ul className="cast">
            <li className="cast__header">cast</li>
            <li className="cast__main">Director</li>
            <li className="cast__surname">{Director}</li>
            <li className="cast__main">Actors</li>
            {Actors.split(',').map(actor =>
              <li key={actor} className="cast__surname">{actor}</li>
            )}
          </ul>
          </div>
        </div>
      </div>  
      );
    }
}

FullMovie.propTypes = propTypes;

module.exports = FullMovie;
