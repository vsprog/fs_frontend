const React = require('react');
const { Route } = require('react-router-dom');
const Menu = require('menu/menu.jsx');
const About = require('about/about.jsx');
const Bookmarks = require('bookmarks/bookmarks.jsx');
const MainPage = require('main-page/main-page.jsx');
const Search = require('search/search.jsx');

const Content = () => (

    <div className = 'content'>
      <Route path="/" exact component={MainPage} />
      <Route path="/search" component={Search} />
      <Route path="/bookmarks" component={Bookmarks} />
      <Route path="/about" component={About} />
    </div>

);

module.exports = Content;
