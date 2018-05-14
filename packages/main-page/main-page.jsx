const React = require('react');
const { Route,  Link } = require('react-router-dom');
const SearchField = require('search-field/search-field.jsx');
const MiniMovie = require('mini-movie/mini-movie.jsx');
const FullMovie = require('full-movie/full-movie.jsx');

class MainPage extends React.Component{
             
    constructor(props){
        super(props);
        this.state = {list: "", fullMovie: "", left: "" };
    }

    takeMovie(responseResult){
		   this.setState({ list: responseResult });
    }

    uploadMovie(incoming){
			 	this.setState({ fullMovie: incoming });	
			 	let popup =  this.refs.popup;
			 	popup.show();		 	
    }

    render() {    	
      return (        	
      	<div className="main-page">
      		<SearchField takeMovie={this.takeMovie.bind(this)}/>
      		<Route path="/:id" component={FullMovie} />	  	
   				{
   					this.state.list.Response==='False' && <div className="error-message">{this.state.list.Error}</div>
   				}
					{ this.state.list.Response==='True' &&
						<div className="main-page__container">
						{this.state.list.Search.map(movie => (
//							<Link key={movie.imdbID} to= {{pathname: `/${movie.imdbID}`}}>
								<MiniMovie key={movie.imdbID} objMovie={movie} uploadMovie={this.uploadMovie.bind(this)} />
//							</Link>	
						))}
						</div>
					}
					{
						(this.state.fullMovie.Title) ? <FullMovie description={this.state.fullMovie} ref="popup"/> : null
					}
      	</div>
      );
    }
}

module.exports = MainPage;