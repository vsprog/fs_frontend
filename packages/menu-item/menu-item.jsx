const React = require('react');
const PropTypes = require('prop-types');
const { NavLink } = require('react-router-dom');

const propTypes = {
  item: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};


const MenuItem = ({ item, path }) => (
  <NavLink exact activeClassName="active" className="menu-list__item" to={path}>
    {item}
  </NavLink>
);

MenuItem.propTypes = propTypes;

module.exports = MenuItem;
