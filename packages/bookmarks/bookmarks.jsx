const React = require('react');
const createRequest = require('core/create-request');
const MovieBox = require('movie-box/movie-box.jsx');

class Bookmarks extends React.Component{

    constructor(props){
        super(props);
        this.state = { bookmarks: [] };     

        this.deleteBookmark = this.deleteBookmark.bind(this);       
    }

    componentDidMount() {
	    createRequest('fetchBookmarks').then((response) => {
	      this.setState({ bookmarks: response.data || [] });
	    });   
  	}

  	deleteBookmark(imdbID){
  		createRequest('deleteBookmark', { imdbID }).then((response) => {	        
        this.setState({ bookmarks: response.data || [] });        
	    });    			    
  	}


    render() {
    	const { bookmarks } = this.state;

    	return(
    		<div className="bookmarks">			    
			    {
			    	bookmarks.map(movie => <MovieBox key = {movie.imdbID} deleteBookmark={this.deleteBookmark} description={movie}/>)
			    }
			  </div>
    	);
    }
 }   
  


module.exports = Bookmarks;
