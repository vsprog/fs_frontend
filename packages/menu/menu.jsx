const React = require('react');
const MenuItem = require('menu-item/menu-item.jsx');
const heads = require('core/locale').captions;

class Menu extends React.Component{
	constructor(props){
		super(props);		
	}

  render(){
    return (
        <div className="menu-list">
          {heads.items.map((head,idx) => (
          	(<MenuItem key={head} item={head} path={heads.paths[idx]}/>)
          ))}
        </div>
    );
  }
}

module.exports = Menu;
