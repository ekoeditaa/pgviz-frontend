import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function TextHighlight({
  children,
  highlight,
}) {
  if (!highlight) return children;

  return (
    <Fragment>
      {children.slice(0, highlight[0])}
      <span className="text-highlight__highlighted">
        {children.slice(highlight[0], highlight[1])}
      </span>
      {children.slice(highlight[1])}
    </Fragment>
  );
}

TextHighlight.propTypes = {
  children: PropTypes.string.isRequired,
  highlight: PropTypes.arrayOf(PropTypes.number),
};

export default TextHighlight;
