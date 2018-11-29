import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { event } from 'd3';

import { createTree, clearTree } from './tree-utils';
import { transformToTree } from './utils';

import './style.css';

class Tree extends PureComponent {
  root1 = createRef();
  root2 = createRef();

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (data !== prevProps.data) {
      const [treeData1, treeData2] = transformToTree(data, prevProps.data);
      clearTree(this.root1.current);
      clearTree(this.root2.current);
      createTree(
        treeData1,
        this.root1.current,
        this.handleNodeEnter,
        this.handleNodeLeave,
      );
      if (treeData2) {
        createTree(
          treeData2,
          this.root2.current,
          this.handleNodeEnter,
          this.handleNodeLeave,
        );
      }
    }
  }

  handleNodeEnter = (node) => {
    const {
      doHighlight,
      setDetails,
      setDetailsPosition,
    } = this.props;

    const { top, left } = event.target.getBoundingClientRect();
    const { highlight, details } = node.data;
    if (highlight) doHighlight(highlight);
    setDetails(details);
    setDetailsPosition({ top, left });
  }

  handleNodeLeave = () => {
    const { doHighlight, setDetails } = this.props;

    doHighlight(null);
    setDetails(null);
  }

  handleWheel = (e) => {
    e.preventDefault();

    const container = e.currentTarget;
    container.scrollLeft += e.deltaY;
    container.scrollLeft += e.deltaX;
  }

  render() {
    return (
      <div
        className="tree"
        onWheel={this.handleWheel}
      >
        <svg ref={this.root1} />
        <svg ref={this.root2} />
      </div>
    );
  }
}

Tree.propTypes = {
  data: PropTypes.shape({
    'Node Type': PropTypes.string,
    Plans: PropTypes.array,
  }),
  doHighlight: PropTypes.func.isRequired,
  setDetails: PropTypes.func.isRequired,
  setDetailsPosition: PropTypes.func.isRequired,
};

export default Tree;
