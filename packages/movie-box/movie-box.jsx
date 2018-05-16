const React = require('react');
const PropTypes = require('prop-types');

const propTypes = {  
  description: PropTypes.object.isRequired,
  deleteBookmark: PropTypes.func.isRequired,  
};

class MovieBox extends React.Component{

    constructor(props){
        super(props);          
    }

    render() {
      const { description, deleteBookmark } = this.props;
    	return(
    		<div className="movie-box">	
          {description.Title}
          <button className="movie-box__button" onClick={deleteBookmark.bind(null, description.imdbID)}>X</button>
			  </div>
    	);
    }
 }   
  
MovieBox.propTypes = propTypes;

module.exports = MovieBox;
