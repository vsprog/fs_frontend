const React = require('react');
const PropTypes = require('prop-types');

const propTypes = {  
  rate: PropTypes.object.isRequired,
}

const Rating = ({ rate }) => (		
	<div>
  	{rate.Source === "Internet Movie Database" &&
		<div>
		  <hr className="line" align="left" width="550" size="1" color="#d8d8d8"/>
		  <div className="rating__title">IMDb</div>
		  <div className="rating__pic-imdb">{rate.Value.split('/')[0]}</div>
		</div>
		}
		{rate.Source === "Rotten Tomatoes" &&
		<div>
		  <hr className="line" align="left" width="550" size="1" color="#d8d8d8"/>
		  <div className="rating__pic-tomat"></div>
		  <div className="rating__title">{rate.Value}</div>
		  <div className="rating__tomatometer tomatometer">
		    <div className="tomatometer__sign">tomatometer</div>
		    <div className="tomatometer__bar">
		      <div className="tomatometer__position" style={{width: rate.Value}}></div>
		    </div>
		  </div>
		</div>
		}
		{rate.Source === "Metacritic" &&
		<div>
		  <hr className="line" align="left" width="550" size="1" color="#d8d8d8"/>
		  <div className="rating__meta">{rate.Value.split('/')[0]}
		    <div className="rating__sign">out of 100</div>
		  </div>
		  <div className="rating__pic-metacr"></div>
		</div>
		}
	</div>
	);

Rating.propTypes = propTypes;

module.exports = Rating;
