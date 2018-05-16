const React = require('react');
const { Route,  Link } = require('react-router-dom');
const SearchField = require('search-field/search-field.jsx');
const MiniMovie = require('mini-movie/mini-movie.jsx');
const FullMovie = require('full-movie/full-movie.jsx');
const createRequest = require('core/create-request');

class Search extends React.Component{

    constructor(props){
        super(props);
        this.state = {list: "", fullMovie: "", movies:[] };

        this.moviePopup = React.createRef();
    }

    componentDidMount() {
      createRequest('getMovies').then((response) => {
        this.setState({ movies: response.data || [] });
      });
    }

    takeMovie(responseResult){
		   this.setState({ list: responseResult });
    }

    uploadMovie(incoming){
			 	this.setState({ fullMovie: incoming });			 	
			 	this.moviePopup.current.show();

        let { movies, fullMovie } = this.state;

        let cinema = Array.from(movies).find((item) => item.imdbID === fullMovie.imdbID);        
        if(cinema) this.moviePopup.current.onStar();
        else this.moviePopup.current.offStar();
    }

    render() {
      return (
      	<div className="main-page">
      		<SearchField takeMovie={this.takeMovie.bind(this)}/>         
   				{
   					this.state.list.Response==='False' && <div className="error-message">{this.state.list.Error}</div>
   				}
					{ this.state.list.Response==='True' &&
						<div className="main-page__container">
						{this.state.list.Search.map(movie => (
							<Link key={movie.imdbID} to={`/search/${movie.imdbID}`} className="main-page__link">
								<MiniMovie key={movie.imdbID} objMovie={movie} uploadMovie={this.uploadMovie.bind(this)} />
							</Link>
						))}
						</div>
					}
					{
						(this.state.fullMovie.Title) ?  
          //  <FullMovie description={this.state.fullMovie} ref={this.moviePopup}/>
              <Route path="/search/:id" render={(props) => (
                <FullMovie {...props} description={this.state.fullMovie} ref={this.moviePopup}/>
              )} /> : null
					}
      	</div>
      );
    }
}

module.exports = Search;
