import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

function Details({ data }) {
  return (
    <div className="details">
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

Details.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

export default Details;
