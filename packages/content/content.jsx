const React = require('react');
const { Route } = require('react-router-dom');
const Menu = require('menu/menu.jsx');
const About = require('about/about.jsx');
const Bookmarks = require('bookmarks/bookmarks.jsx');
const MainPage = require('main-page/main-page.jsx');
const Search = require('search/search.jsx');


class Content extends React.Component{

	constructor(props){
		super(props);  
		this.state={isEndOfPage: false};		

    this.handleScroll = this.handleScroll.bind(this);
	}

	handleScroll(e){		
		let end = e.target.scrollHeight - 100 <= e.target.offsetHeight + e.target.scrollTop;
		
		if (end && this.search) {
			this.search.showNextButton();			
		} 				
	}

	render(){

		return (		 
		  <div className = 'content' onScroll={this.handleScroll}>		 	
	      <Route path="/" exact component={MainPage} />
	      <Route path="/search" render={(props) => (
				  <Search {...props} ref={ (c) =>{this.search = c}}/>
				)} />
	      <Route path="/bookmarks" component={Bookmarks} />
	      <Route path="/about" component={About} />
	    </div>
		);
	}
}

module.exports = Content;
