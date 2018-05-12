const React = require('react');
const { Route } = require('react-router-dom');
const Menu = require('menu/menu.jsx');
const About = require('about/about.jsx');
const Bookmarks = require('bookmarks/bookmarks.jsx')
const MainPage = require('main-page/main-page.jsx')

const Content = () => (

    <div className = 'content'>
      <Route path="/" exact component={MainPage} />
      <Route path="/bookmarks" exact component={Bookmarks} />
      <Route path="/about" component={About} />
    </div>

);

module.exports = Content;
