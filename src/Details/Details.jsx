import React from 'react';
import PropTypes from 'prop-types';

import {
  DELETED_COLOR_LIGHT,
  NEW_COLOR_LIGHT,
} from '../colors';

import './style.css';

const renderLine = (line, idx) => {
  if (line.trimStart().startsWith('"+')) {
    return (
      <pre
        key={idx}
        className="details__change"
        style={{ backgroundColor: NEW_COLOR_LIGHT }}
      >
        {line}
      </pre>
    );
  }

  if (line.trimStart().startsWith('"-')) {
    return (
      <pre
        key={idx}
        className="details__change"
        style={{ backgroundColor: DELETED_COLOR_LIGHT }}
      >
        {line}
      </pre>
    );
  }

  return <pre key={idx}>{line}</pre>;
};

function Details({ data }) {
  return (
    <div className="details">
      {JSON
        .stringify(data, null, 2)
        .split('\n')
        .map(renderLine)}
    </div>
  );
}

Details.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

export default Details;
