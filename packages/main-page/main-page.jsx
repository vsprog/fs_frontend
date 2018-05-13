const React = require('react');
const SearchField = require('search-field/search-field.jsx');
const MiniMovie = require('mini-movie/mini-movie.jsx');
const { apiKey, plot } = require('core/constants.js').omdbapi;

class MainPage extends React.Component{
             
    constructor(props){
        super(props);
        this.state = {result: ""};      
    }

    takeMovie(responseResult){
		   this.setState({ result: responseResult });
    }

    uploadMovie(id){
			fetch(`http://www.omdbapi.com/?i=${id}&plot=${plot}&apiKey=${apiKey}`)
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
        
      })
      .catch(error => console.log(error));    	
    }

    render() {
        return (
        	<div>
        		<SearchField takeMovie={this.takeMovie.bind(this)}/>  	
     				{
     					this.state.result.Response==='False' && <div className="error-message">{this.state.result.Error}</div>
     				}
						{ this.state.result.Response==='True' &&
							<div className="main-page-container">
							{this.state.result.Search.map(movie => (
								<MiniMovie objMovie={movie} key={movie.imdbID} uploadMovie={this.uploadMovie}/>
							))}
							</div>
						}
        	</div>
        );
    }
}

module.exports = MainPage;