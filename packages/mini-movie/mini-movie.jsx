const React = require('react');
const PropTypes = require('prop-types');
const { apiKey, plot } = require('core/constants.js').omdbapi;
const Na = require('./No_Image_Available.png');

const propTypes = {
  showFullMoviePopup: PropTypes.func.isRequired,
  objMovie: PropTypes.object.isRequired,
};

class MiniMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { backSize: '100% 100%' };
    
    this.leave = this.leave.bind(this);
    this.hover = this.hover.bind(this);
  }

  uploadHandler(id, e) { // createRequest("POST/omdb")
    fetch(`http://www.omdbapi.com/?i=${id}&plot=${plot}&apiKey=${apiKey}`)
      .then((response) => {
        if (response.ok) return response.json();

        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      })
      .then((result) => {
        console.log(result);
        this.props.showFullMoviePopup(result);
      })
      .catch((error) => console.log(error));
  }

  hover(e) {
    this.setState({ backSize: '200% 200%' });
  }

  leave(e) {
    this.setState({ backSize: '100% 100%' });
  }

  render() {
    let { Title, Year, Poster, imdbID } = this.props.objMovie;

    // иначе будут ошибки в результатах поиска
    let path = location.href;
    path = path.slice(0, path.search(/search|bookmark/g));

    if (Poster === 'N/A') Poster = path + Na;
    return (
      <div className="mini-movie" onClick={this.uploadHandler.bind(this, imdbID)}>
        <div className="mini-movie__poster" onMouseLeave={this.leave} onMouseEnter={this.hover} style={{ backgroundImage: `url(${Poster})`, backgroundSize: this.state.backSize }} />
        <div className="mini-movie__title">{Title}</div>
        <div className="mini-movie__year">{Year}</div>
      </div>
    );
  }
}

MiniMovie.propTypes = propTypes;

module.exports = MiniMovie;
