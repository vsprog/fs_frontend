const React = require('react');
const createRequest = require('core/create-request');
const MovieBox = require('movie-box/movie-box.jsx');

class Bookmarks extends React.Component{

    constructor(props){
        super(props);
        this.state = { movies: [] };     

        this.deleteBookmark = this.deleteBookmark.bind(this);       
    }

    componentDidMount() {
	    createRequest('fetchMovies').then((response) => {
	      this.setState({ movies: response.data || [] });
	    });   
  	}

  	deleteBookmark(imdbID){
  		createRequest('deleteBookmark', { imdbID }).then((response) => {	        
        this.setState({ movies: response.data || [] });        
	    });    			    
  	}


    render() {
    	const { movies } = this.state;

    	return(
    		<div className="bookmarks">
			    <div>Закладки!</div>
			    {
			    	movies.map(movie => <MovieBox key = {movie.imdbID} deleteBookmark={this.deleteBookmark} description={movie}/>)
			    }
			  </div>
    	);
    }
 }   
  


module.exports = Bookmarks;
