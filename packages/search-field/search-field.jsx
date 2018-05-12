const React = require('react');
const { apiKey, page } = require('core/constants.js').omdbapi;

class SearchField extends React.Component{
             
    constructor(props){
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this);
    }
             
    onTextChanged(e){
        var title = e.target.value.trim();
        fetch(`http://www.omdbapi.com/?s=${title}&${page}&${apikey}`)
          .then(response => {
            if(response.ok) return response.json();
            else {
              let error = new Error(response.statusText);
              error.response = response;
              throw error;
            }
          })
          .then(result => console.log(result.Search))
          .catch();
    }
             
    render() {
        return <input className="search-field search-text" placeholder="Search..." onChange={this.onTextChanged} />;
    }
}


module.exports = SearchField;