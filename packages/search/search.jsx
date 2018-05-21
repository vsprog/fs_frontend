const React = require('react');
const { Route,  Link } = require('react-router-dom');
const SearchField = require('search-field/search-field.jsx');
const MiniMovie = require('mini-movie/mini-movie.jsx');
const FullMovie = require('full-movie/full-movie.jsx');
const createRequest = require('core/create-request');

class Search extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          movies: "", 
          fullMovie: {}, 
          bookmarks:[], 
          opacity: "0",
          isLoading: true,
        };

        this.toggleMark = this.toggleMark.bind(this);
        this.callSearchMovies = this.callSearchMovies.bind(this);
        this.hideNextButton = this.hideNextButton.bind(this);

        this.moviePopup = null;//React.createRef();
    }

    componentDidMount() {    
      createRequest('searchMovies').then((response) => {
        this.setState({ bookmarks: response.data || [], isLoading: false });
      });
    }    

    findMovie(responseResult){
      this.hideNextButton();
		  this.setState({ movies: responseResult, isLoading: false });
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
      this.setState({ fullMovie: incoming  }); 
      this.moviePopup.toggleView();  //current.toggleView()

      let { bookmarks } = this.state;
      let bookmark = Array.from(bookmarks).find((item) => item.imdbID === incoming.imdbID);        
      bookmark ? this.moviePopup.onStar() : this.moviePopup.offStar();       
        
    }

    loadingProcess(){
      this.setState({ isLoading: true });
    }

    callSearchMovies(){
      this.searchField.callGetAlotMovies();      
    }

    showNextButton(){
      this.setState({opacity: "1"});
    }

    hideNextButton(){
      this.setState({opacity: "0"});
    }

    render() {
      let { movies, fullMovie, opacity, isLoading } = this.state;

      return (
      	<div className="search-page" >
          {
            isLoading && <div className="loading"></div> 
          }
      		<SearchField loadingProcess={this.loadingProcess.bind(this)} findMovie={this.findMovie.bind(this)} ref={ (c) =>{this.searchField = c}}/>
          { !movies && 
            <div>
              <div className="stub stub__news">Новости</div>
              <div className="stub stub__adv">Реклама</div>
            </div>
          }   				
					{ movies.Response==='True' &&
						<div className="search-page__container">
						{movies.Search.map(movie => (
//key ={String(Math.random().toString(16).split('.')[1])} иначе плохо грузит с одинаковыми imdbID
							<Link key={movie.imdbID} to={`/search/${movie.imdbID}`} className="search-page__link">
								<MiniMovie objMovie={movie} showFullMoviePopup={this.showFullMoviePopup.bind(this)} />
							</Link>
						))}
						</div>
					}
          {
            movies.Response==='False' && <div className="error-message">{movies.Error}</div>
          }
					{
						( fullMovie.Title) ?          
              <Route path="/search/:id" render={(props) => (
                <FullMovie {...props} toggleMark = {this.toggleMark} description={fullMovie} ref={(c)=>{this.moviePopup=c }}/>
              )} /> : null
					}
          
          <div className="next" style={{opacity: opacity}} onClick={this.callSearchMovies}>
            <div className="next__button"></div>
          </div>
          
      	</div>
      );
    }
}

module.exports = Search;
