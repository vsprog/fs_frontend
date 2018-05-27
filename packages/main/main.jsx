const React = require('react');
const Router = require('react-router-dom').BrowserRouter;
const Menu = require('menu/menu.jsx');
const Content = require('content/content.jsx');

const Main = () => (
  <Router>
    <div className="main">
      <Menu />
      <Content />
    </div>
  </Router>
);

module.exports = Main;
