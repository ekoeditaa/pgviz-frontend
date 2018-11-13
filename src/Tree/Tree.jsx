import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { event } from 'd3';
import swal from 'sweetalert2';

import { createTree, clearTree } from './tree-utils';
import { transformToTree } from './utils';

import './style.css';

class Tree extends PureComponent {
  root = createRef();

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (data['success'] === 'false') {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'There was an error with the query. Try another one!',
      })
    } else if (data !== prevProps.data) {
      const treeData = transformToTree(data);
      clearTree(this.root.current);
      createTree(
        treeData,
        this.root.current,
        this.handleNodeEnter,
        this.handleNodeLeave,
      );
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
        <svg ref={this.root} />
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
