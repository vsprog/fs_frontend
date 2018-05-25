const React = require('react');
const PropTypes = require('prop-types');
const Rating = require('rating/rating');
const star = require('./mark.png');
const starActive = require('./mark_active.png');
const Na = require('mini-movie/No_Image_Available.png');

const propTypes = {
  description: PropTypes.object.isRequired,
  toggleMark: PropTypes.func.isRequired,
};

class FullMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false, markImg: star };

    this.toggleView = this.toggleView.bind(this);
  }

  onStar() {
    this.setState({ markImg: starActive });
  }

  offStar() {
    this.setState({ markImg: star });
  }

  toggleView(e) {
    this.setState({ active: !this.state.active });
  }

  render() {
    let { Title, Released, Poster, Genre, Plot, Runtime, imdbID, Actors, Director, Country, Ratings } = this.props.description;
    const { toggleMark } = this.props;
    const { active, markImg } = this.state;
    // иначе будет пытаться загрузить изображения из localhost/search/s
    let path = location.href;
    path = path.slice(0, path.search(/search|bookmark/g));

    if (Poster === 'N/A') Poster = path + Na;
    return (
      <div className={active ? 'fixed-container show' : 'fixed-container'}>
        <div className="full-movie">
          <div className="full-movie__container">
            <div className="full-movie__title">{Title}</div>
            <div className="full-movie__info">
              {Genre} | {Runtime} | {Released} ({Country})
            </div>
            <button type="button" className="full-movie__close button" onClick={this.toggleView}>X</button>
            <img onClick={toggleMark.bind(null, this.props.description)} className="full-movie__bookmark button" src={path + markImg} align="middle" alt="mark" />
            <img src={Poster} align="middle" alt="poster" className="full-movie__poster" />
        {/*    <button type="button" className="full-movie__trailer">watch trailer</button>  */}
            <div className="full-movie__plot">{Plot}</div>
            { Ratings
            && Ratings.map((rating) => <Rating key={rating.Value} rate={rating} />)
            }
            <ul className="cast">
              <li className="cast__header">cast</li>
              <li className="cast__main">Director</li>
              <li className="cast__surname">{Director}</li>
              <li className="cast__main">Actors</li>
              { Actors
              && Actors.split(',').map((actor) => <li key={actor} className="cast__surname">{actor}</li>)
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

FullMovie.propTypes = propTypes;

module.exports = FullMovie;
