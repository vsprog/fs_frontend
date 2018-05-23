const React = require('react');
const MenuItem = require('menu-item/menu-item.jsx');
const { captions } = require('core/locale');

const Menu = () =>(
  <div className="menu-list">
    {captions.map((cap) => (
      (<MenuItem key={cap.label} item={cap.label} path={cap.path} />)
    ))}
  </div>
);

module.exports = Menu;
