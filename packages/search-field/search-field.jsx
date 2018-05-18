const React = require('react');
const PropTypes = require('prop-types');
const { apiKey, page } = require('core/constants.js').omdbapi;

const propTypes = {
  findMovie: PropTypes.func.isRequired  
};

class SearchField extends React.Component{
             
    constructor(props){
        super(props);
        this.state = {title: ""};

        this.onTextChanged = this.onTextChanged.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
        this.getAlotSearchMovies = this.getAlotSearchMovies.bind(this);  
        this.searchCallback = this.searchCallback.bind(this);      
    }
             
    onTextChanged(e){
        let value = e.target.value.trim();
        this.setState({title: value});        
    }

    getAlotSearchMovies(callback, pageNumber, searchResult=[], searchResultObj = {}){
      return new Promise((resolve, reject) => fetch(`http://www.omdbapi.com/?s=${this.state.title}&page=${pageNumber}&apiKey=${apiKey}`)
          .then(response => {
            if (response.status !== 200)  {
              let error = new Error(response.statusText);
              error.response = response;
              throw error;
            }
            response.json().then(data => {
              searchResultObj = data;
              if (data.Search) searchResult = searchResult.concat(data.Search);

              searchResultObj.Search = searchResult;
              callback && callback(searchResultObj);
              
              if (pageNumber<10 && (pageNumber*10)<data.totalResults){                
                this.getAlotSearchMovies(callback, ++pageNumber, searchResult, searchResultObj);
              } else {
                resolve(searchResult);
              }
            }).catch(reject);
          }).catch(reject));
    }

    searchCallback(moviesJson){
      console.log(moviesJson);      
      this.props.findMovie(moviesJson);
    }

    searchSubmit(e){
      e.preventDefault();

      this.getAlotSearchMovies(this.searchCallback, page)      
        .then(result => {         
        console.log("wrong request");
        })
        .catch(console.error);    
    }
             
    render() {
        return (
          <form onSubmit={this.searchSubmit}>
            <input className="search-field search-text" placeholder="Search..." onChange={this.onTextChanged}/>
          </form>
        );
    }
}

SearchField.propTypes = propTypes;

module.exports = SearchField;