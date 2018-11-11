import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './style.css';

function TextHighlight({
  children,
  range,
}) {
  if (!range) return children;

  return (
    <Fragment>
      {children.slice(0, range[0])}
      <span className="text-highlight__highlighted">
        {children.slice(range[0], range[1])}
      </span>
      {children.slice(range[1])}
    </Fragment>
  );
}

TextHighlight.propTypes = {
  children: PropTypes.string.isRequired,
  range: PropTypes.arrayOf(PropTypes.number),
};

export default TextHighlight;
