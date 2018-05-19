const React = require('react');
const createRequest = require('core/create-request');
const MovieBox = require('movie-box/movie-box.jsx');
const FullMovie = require('full-movie/full-movie.jsx');

class Bookmarks extends React.Component{

    constructor(props){
        super(props);
        this.state = { bookmarks: [], fullMovie: {} };     

        this.deleteBookmark = this.deleteBookmark.bind(this);       
        this.showMovie = this.showMovie.bind(this); 
        this.toggleMark = this.toggleMark.bind(this);
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

    showMovie(imdbID){
      createRequest('fetchBookmark', { imdbID }).then((response) => {          
        this.setState({fullMovie: response.data});
        this.moviePopup.toggleView();

        let { bookmarks } = this.state;
        let bookmark = Array.from(bookmarks).find((item) => item.imdbID === response.data.imdbID);        
        bookmark ? this.moviePopup.onStar() : this.moviePopup.offStar();  
      }); 
    }

    toggleMark(movie){
      let { bookmarks } = this.state;
      let bookmark = bookmarks.find((item) => item.imdbID === movie.imdbID);
      let imdbID=movie.imdbID;

      if (bookmark){      
        this.moviePopup.offStar();
        createRequest('deleteMovie', { imdbID }).then((response) => {
          this.setState({bookmarks: response.data || []});
        });
      } else {        
        this.moviePopup.onStar();
        createRequest('addMovie', {}, { movie }).then((response) => {
          this.setState({bookmarks: response.data || []});
        });
      }
    }

    render() {
    	const { bookmarks } = this.state;

    	return(
    		<div className="bookmarks">			    
			    {
			    	bookmarks.map(movie => <MovieBox key = {movie.imdbID} deleteBookmark={this.deleteBookmark} showMovie={this.showMovie} description={movie}/>)
			    }
          {
            ( this.state.fullMovie.Title) ?          
              <FullMovie toggleMark = {this.toggleMark} description={this.state.fullMovie} ref={(c)=>{this.moviePopup=c }}/>
              : null
          }
			  </div>
    	);
    }
 }   


module.exports = Bookmarks;
