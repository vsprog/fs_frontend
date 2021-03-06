const React = require('react');
const createRequest = require('core/create-request');
const MovieBox = require('movie-box/movie-box.jsx');
const FullMovie = require('full-movie/full-movie.jsx');
const update = require('immutability-helper');
const { DragDropContext } = require('react-dnd');
const HTML5Backend = require('react-dnd-html5-backend');

@DragDropContext(HTML5Backend)
class Bookmarks extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      bookmarks: [],
      fullMovie: {},
      isLoading: true,
    };

    this.deleteBookmark = this.deleteBookmark.bind(this);
    this.deleteAllBm = this.deleteAllBm.bind(this);
    this.showMovie = this.showMovie.bind(this);
    this.toggleMark = this.toggleMark.bind(this);
    this.moveBookmark = this.moveBookmark.bind(this);
    this.updateIndices = this.updateIndices.bind(this);
  }

  componentDidMount() {
    createRequest('fetchBookmarks').then((response) => {
      this.setState({ bookmarks: response.data || [], isLoading: false });
    });
	}

  moveBookmark(dragIndex, hoverIndex) {
    const { bookmarks } = this.state;
    const dragBookmark = bookmarks[dragIndex];

    this.setState(update(this.state, {bookmarks: {$splice: [[dragIndex, 1], [hoverIndex, 0, dragBookmark]]}} ) );    
    this.updateIndices();
  }

  updateIndices(){
    const { bookmarks } = this.state;
    bookmarks.forEach((movie, ind) => {
      const { imdbID } = movie;
      createRequest('updateBokmark', { imdbID }, { order: ind }).then((response) => {
       console.log("updateIndices");
      });
    });
  }

	deleteBookmark(imdbID){
		createRequest('deleteBookmark', { imdbID }).then((response) => {
      this.setState({ bookmarks: response.data || [] });
    });
	}

  deleteAllBm(){
    createRequest('deleteAllBookmarks').then((response) => {
      this.setState({ bookmarks: [] });
    });
  }

  showMovie(imdbID){
    let { bookmarks } = this.state;

    createRequest('fetchBookmark', { imdbID }).then((response) => {
      this.setState({ fullMovie: response.data });
      this.moviePopup.toggleView();

      let bookmark = Array.from(bookmarks).find((item) => item.imdbID === response.data.imdbID);
      bookmark ? this.moviePopup.onStar() : this.moviePopup.offStar();
    });
  }

  toggleMark(movie){
    let { bookmarks } = this.state;
    let bookmark = bookmarks.find((item) => item.imdbID === movie.imdbID);
    let { imdbID } = movie;

    if (bookmark){
      this.moviePopup.offStar();
      createRequest('deleteBookmark', { imdbID }).then((response) => {
        this.setState({ bookmarks: response.data || [] });
      });
    } else {
      this.moviePopup.onStar();
      createRequest('addBookmark', {}, { movie }).then((response) => {
        this.setState({ bookmarks: response.data || [] });
      });
    }
  }

  render() {
  	const { bookmarks, isLoading, fullMovie } = this.state;

  	return(
  		<div className="bookmarks">
        <div className="bookmarks__panel">
          <button type="button" className="bookmarks__delete" onClick={this.deleteAllBm}>удалить все</button>
        </div>
        {
          isLoading && <div className="loading"></div>
        }
		    {
		    	bookmarks.map((movie, ind) => <MovieBox index={ind} key = {movie.imdbID} moveBookmark={this.moveBookmark} deleteBookmark={this.deleteBookmark} showMovie={this.showMovie} description={movie}/>)
		    }
        <FullMovie toggleMark = {this.toggleMark} description={fullMovie} ref={(c)=>{this.moviePopup=c }}/>
		  </div>
  	);
  }
}


module.exports = Bookmarks;
