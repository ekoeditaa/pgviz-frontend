import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDiffHighlights } from '../diff-utils';
import { DELETED_COLOR_LIGHT, NEW_COLOR_LIGHT } from '../colors';
import './style.css';

class TextDiff extends PureComponent {
  renderChunk(chunk, idx) {
    let style;

    if (chunk[0] === -1) style = { backgroundColor: DELETED_COLOR_LIGHT };
    if (chunk[0] === 1) style = { backgroundColor: NEW_COLOR_LIGHT };

    return (
      <span
        key={idx}
        className="text-diff"
        style={style}
      >
        {chunk[1]}
      </span>
    )
  }

  render() {
    const { current, previous } = this.props;
    const chunks = findDiffHighlights(previous, current);

    return chunks.map(this.renderChunk);
  }
}

TextDiff.propTypes = {
  current: PropTypes.string.isRequired,
  previous: PropTypes.string.isRequired,
};

export default TextDiff;
