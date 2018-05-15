const React = require('react');

class Bookmarks extends React.Component{

    constructor(props){
        super(props);
        this.state = {list: "", fullMovie: "" };

        this.moviePopup = React.createRef();
    }


    render() {
    	return(
    		<div className="about">
			    Bookmarks
			  </div>
    	);
    }
 }   
  


module.exports = Bookmarks;
