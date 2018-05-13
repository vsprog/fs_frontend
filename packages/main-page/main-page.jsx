const React = require('react');
const SearchField = require('search-field/search-field.jsx');
const MiniMovie = require('mini-movie/mini-movie.jsx');

class MainPage extends React.Component{
             
    constructor(props){
        super(props);
        this.state = {list: "", fullMovie: ""};
    }

    takeMovie(responseResult){
		   this.setState({ list: responseResult });
    }

    uploadMovie(incoming){
			 	this.setState({ fullMovie: incoming });			 	
    }

    render() {
        return (
        	<div>
        		<SearchField takeMovie={this.takeMovie.bind(this)}/>  	
     				{
     					this.state.list.Response==='False' && <div className="error-message">{this.state.list.Error}</div>
     				}
						{ this.state.list.Response==='True' &&
							<div className="main-page-container">
							{this.state.list.Search.map(movie => (
								<MiniMovie objMovie={movie} key={movie.imdbID} uploadMovie={this.uploadMovie.bind(this)}/>
							))}
							</div>
						}
        	</div>
        );
    }
}

module.exports = MainPage;