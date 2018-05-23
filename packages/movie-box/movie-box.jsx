const React = require('react');
const {findDOMNode}  = require('react-dom');
const PropTypes = require('prop-types');
const { DragSource, DropTarget } = require('react-dnd');
const itemTypes = require('./itemTypes');
import Na from 'mini-movie/No_Image_Available.png';

const propTypes = {  
  description: PropTypes.object.isRequired,
  deleteBookmark: PropTypes.func.isRequired,  
  showMovie: PropTypes.func.isRequired,
//    connectDragSource: PropTypes.func.isRequired,
//    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
//    isDragging: PropTypes.bool.isRequired,    
    moveBookmark: PropTypes.func.isRequired,
};

const bmSource = {
  beginDrag(props) {
    return {
      description: props.description,
      index: props.index,
    };
  },
};

const bmTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();    
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;    
    const clientOffset = monitor.getClientOffset();    
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveBookmark(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },  
};

@DropTarget("movie-box", bmTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource("movie-box", bmSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class MovieBox extends React.Component{

    constructor(props){
      super(props); 
      this.state = {class: "movie-box"};
    }

    toggleClass(e){
      if (this.state.class === "movie-box"){
        this.setState({class: "movie-box twirl"});
      } else {
        this.setState({class: "movie-box"});
      }
    }

    render() {
      const { deleteBookmark, showMovie, isDragging, connectDragSource, connectDropTarget } = this.props;
      let { Title, Genre, Runtime, Year, Poster, imdbID, Country, Ratings, Plot } = this.props.description;

      if (Poster==="N/A") Poster = Na;

    	return connectDragSource(
        connectDropTarget(
          <div className={this.state.class}>
            <div className="movie-box__front" style={{backgroundImage: `url(${Poster})`}}>
              <div className="movie-box__title" onMouseLeave={this.toggleClass.bind(this)} onMouseEnter={this.toggleClass.bind(this)}>{Title} ({Year})</div>
              <div className="movie-box__info">{Genre} | {Runtime}</div>
              <button className="movie-box__close btn" onClick={deleteBookmark.bind(null, imdbID)}>X</button>
              <div className="movie-box__watch btn" onClick={showMovie.bind(null, imdbID)}></div> 
            </div>
            <div className="movie-box__back">
              <div className="movie-box__plot">{Plot}</div>
            </div>
          </div>
        ),
      );
    }
 }  

MovieBox.propTypes = propTypes;

module.exports = MovieBox;
