const React = require('react');
const express = require('./express.png');
const node = require('./node.png');
const powered = require('./powered.png');
const react = require('./react.png');

const About = () => (
  <div>
    <img className="tech" src={powered} align="middle" alt="mark" />
    <img className="tech" src={node} align="middle" alt="mark" />
    <img className="tech" src={express} align="middle" alt="mark" />
    <img className="tech" src={react} align="middle" alt="mark" />
  </div>
);

module.exports = About;
