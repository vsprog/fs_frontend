const React = require('react');
const PropTypes = require('prop-types');
const { apiKey, page } = require('core/constants.js').omdbapi;

const propTypes = {
  takeMovie: PropTypes.func.isRequired  
};

class SearchField extends React.Component{
             
    constructor(props){
        super(props);
        this.state = {title: ""};

        this.onTextChanged = this.onTextChanged.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
    }
             
    onTextChanged(e){
        let value = e.target.value.trim();
        this.setState({title: value});        
    }

    searchSubmit(e){
      e.preventDefault();

      fetch(`http://www.omdbapi.com/?s=${this.state.title}&page=${page}&apiKey=${apiKey}`)
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
        this.props.takeMovie(result);
      })
      .catch(error => console.log(error));
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