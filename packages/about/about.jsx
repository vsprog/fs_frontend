const React = require('react');
import express from './express.png';
import node from './node.png';
import powered from './powered.png';
import react from './react.png';

const About = () => (
	<div>
	  <img src={powered} align='middle' alt='mark' />
	  <img src={node} align='middle' alt='mark' />
	  <img src={express} align='middle' alt='mark' />
	  <img src={react} align='middle' alt='mark' />
	</div>
);

module.exports = About;
