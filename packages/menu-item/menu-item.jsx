const React = require('react');
const PropTypes = require('prop-types');
const { NavLink } = require('react-router-dom');

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
			<NavLink exact activeClassName="active" className="menu-list__item" to={this.props.path}>
    		{this.props.item}
    	</NavLink>
		);
	}
}

MenuItem.propTypes = propTypes;

module.exports = MenuItem;
