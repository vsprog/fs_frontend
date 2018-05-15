const React = require('react');
import adv from './adv.jpg';

const MainPage = () => (
  <div className="main-page">
    Главная страница!
    Приветствие!
    <img src = {adv} align='middle' alt='poster' className="main-page__adv"/>
  </div>
);

module.exports = MainPage;
