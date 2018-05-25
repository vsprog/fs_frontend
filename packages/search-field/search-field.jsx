const React = require('react');
const PropTypes = require('prop-types');
const { apiKey, page } = require('core/constants.js').omdbapi;

const propTypes = {
  findMovie: PropTypes.func.isRequired,
  loadingProcess: PropTypes.func.isRequired,
};

class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', pageNumber: page, totalResults: 0 };

    this.onTextChanged = this.onTextChanged.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.getAlotSearchMovies = this.getAlotSearchMovies.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
  }

  onTextChanged(e) {
    const value = e.target.value.trim();
    this.setState({ title: value, pageNumber: page });
  }

  getAlotSearchMovies(callback, pageNumber, searchResult = [], searchResultObj = {}) {
    return new Promise((resolve, reject) => fetch(`http://www.omdbapi.com/?s=${this.state.title}&page=${pageNumber}&apiKey=${apiKey}`)
      .then((response) => {
        if (response.status !== 200) {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
        response.json().then((data) => {
          this.setState({ totalResults: data.totalResults });
          searchResultObj = data;
          if (data.Search) {
            searchResult = searchResult.concat(data.Search);
          }

          searchResultObj.Search = searchResult;
          callback && callback(searchResultObj);

          if ((pageNumber - 1) % 5 < 4 && (pageNumber * 10) < data.totalResults) {
            this.getAlotSearchMovies(callback, ++pageNumber, searchResult, searchResultObj);
          } else {
            resolve(searchResultObj);
          }
        }).catch(reject);
      }).catch(reject));
  }

  searchCallback(moviesJson) {
    console.log(moviesJson);
    this.props.findMovie(moviesJson);
  }

  callGetAlotMovies() {
    let { pageNumber, totalResults } = this.state;
    if (totalResults && totalResults <= pageNumber*10) return;

    this.props.loadingProcess();

    this.getAlotSearchMovies(this.searchCallback, pageNumber)
      .then((result) => {
        console.log('wrong request');
      })
      .catch(console.error);

    this.setState({ pageNumber: pageNumber + 5 });
  }

  searchSubmit(e) {
    e.preventDefault();

    this.callGetAlotMovies(this.state.pageNumber);
  }

  render() {
    return (
      <form onSubmit={this.searchSubmit}>
        <input className="search-field search-text" placeholder="Search..." onChange={this.onTextChanged} />
      </form>
    );
  }
}

SearchField.propTypes = propTypes;

module.exports = SearchField;
