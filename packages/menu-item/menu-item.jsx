const React = require('react');
const PropTypes = require('prop-types');
const { Link } = require('react-router-dom');

const propTypes = {
  item: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

class MenuItem extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (			
			<Link className="menu-list__item" to={this.props.path}>
    		{this.props.item}
    	</Link>
		);
	}
}

MenuItem.propTypes = propTypes;

module.exports = MenuItem;
