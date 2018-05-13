const React = require('react');

class FullMovie extends React.Component{
             
    constructor(props){
        super(props);     
    }
                              
    render() {
    //	let { Title, Year, Poster, imdbID } = this.props.objMovie;	    	
      return (
      	<div>
      		описание фильма
          {this.props.description.title}
      	</div>
      );
    }
}

module.exports = FullMovie;