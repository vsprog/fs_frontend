const React = require('react');
const { Route,  Link } = require('react-router-dom');
const SearchField = require('search-field/search-field.jsx');
const MiniMovie = require('mini-movie/mini-movie.jsx');
const FullMovie = require('full-movie/full-movie.jsx');
const createRequest = require('core/create-request');

class Search extends React.Component{

    constructor(props){
        super(props);
        this.state = {movies: "", fullMovie: "", bookmarks:[] };

        this.toggleMark = this.toggleMark.bind(this);

        this.moviePopup = null;//React.createRef();
    }

    componentDidMount() {    
      createRequest('searchMovies').then((response) => {
        this.setState({ bookmarks: response.data || [] });
      });
    }

    findMovie(responseResult){
		   this.setState({ movies: responseResult });
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

    showFullMoviePopup(incoming){        
      this.setState({ fullMovie: incoming }); 
      this.moviePopup.toggleView();  //current.toggleView()

      let { bookmarks } = this.state;
      let bookmark = Array.from(bookmarks).find((item) => item.imdbID === incoming.imdbID);        
      bookmark ? this.moviePopup.onStar() : this.moviePopup.offStar();       
        
    }

    render() {
      return (
      	<div className="search-page">
      		<SearchField findMovie={this.findMovie.bind(this)} />
   				{
   					this.state.movies.Response==='False' && <div className="error-message">{this.state.movies.Error}</div>
   				}
					{ this.state.movies.Response==='True' &&
						<div className="search-page__container">
						{this.state.movies.Search.map(movie => (
							<Link key={movie.imdbID} to={`/search/${movie.imdbID}`} className="search-page__link">
								<MiniMovie key={movie.imdbID} objMovie={movie} showFullMoviePopup={this.showFullMoviePopup.bind(this)} />
							</Link>
						))}
						</div>
					}
					{
						(this.state.fullMovie.Title) ?          
              <Route path="/search/:id" render={(props) => (
                <FullMovie {...props} toggleMark = {this.toggleMark} description={this.state.fullMovie} ref={(c)=>{this.moviePopup=c }}/>
              )} /> : null
					}
      	</div>
      );
    }
}

module.exports = Search;
