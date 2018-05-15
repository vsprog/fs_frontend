const React = require('react');
const PropTypes = require('prop-types');
const { Link } = require('react-router-dom');
import bookmark from './mark.png';
import bookmark_active from './mark_active.png';
import Na from 'mini-movie/No_Image_Available.png';

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
    	let { Title, Released, Poster, Genre, Plot, Runtime, imdbID, Actors, Director, Writer, Country, Ratings } = this.props.description;
      
      //иначе будет пытаться загрузить изображения из localhost/search/s
      let path = location.href;
      path = path.slice(0, path.indexOf('search'));

      if (Poster==="N/A") Poster = path + Na;  
      return (        
        <div className="full-movie" style={{left: this.state.left}}>
          <div className="full-movie__container">
            <div className="full-movie__title">{Title}</div>
            <div className="full-movie__info">
              {Genre} | {Runtime} | {Released} ({Country})
            </div>
          <button className="full-movie__close button" onClick={this.move}>X</button>
          <img className="full-movie__bookmark button" src={path + bookmark} align='middle' alt='mark' />
          <img src = {Poster} align='middle' alt='poster' className="full-movie__poster" />
          <div className="full-movie__plot">{Plot}</div>
           
          {Ratings[0] && 
          <div>
            <hr className="line" align="left" width="550" size="1" color="#d8d8d8"/>    
            <div className="rating__imdb">IMDb</div>
            <div className="rating__pic1">{Ratings[0].Value.split('/')[0]}</div>
          </div>
          }
          {Ratings[1] &&
          <div>
            <hr className="line" align="left" width="550" size="1" color="#d8d8d8"/> 
            <div className="rating__pic2"></div>
            <div className="rating__imdb">{Ratings[1].Value}</div>
            <div className="rating__tomatometer tomatometer">
              <div className="tomatometer__sign">tomatometer</div>
              <div className="tomatometer__bar">
                <div className="tomatometer__position" style={{width: Ratings[1].Value}}></div>
              </div>
            </div>
          </div>
          }
          {Ratings[2] &&
          <div>
            <hr className="line" align="left" width="550" size="1" color="#d8d8d8"/>    
            <div className="rating__meta">{Ratings[2].Value.split('/')[0]}</div>
            <div className="rating__pic3"></div>
          </div>
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
      );
    }
}

FullMovie.propTypes = propTypes;

module.exports = FullMovie;
