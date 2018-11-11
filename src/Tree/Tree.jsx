import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import { createTree } from './tree-utils';
import { transformToTree } from './utils';

class Tree extends PureComponent {
  root = createRef();

  componentDidUpdate(prevProps) {
    const { data, doHighlight } = this.props;
    if (data !== prevProps.data) {
      const treeData = transformToTree(data);
      createTree(treeData, this.root.current, this.handleNodeHover);
    }
  }

  handleNodeHover = (d) => {
    const { doHighlight } = this.props;
    console.log(d);
  }

  render() {
    return (
      <svg ref={this.root} />
    );
  }
}

Tree.propTypes = {
  data: PropTypes.shape({
    'Node Type': PropTypes.string,
    Plans: PropTypes.array,
  }),
  doHighlight: PropTypes.func.isRequired,
};

export default Tree;
