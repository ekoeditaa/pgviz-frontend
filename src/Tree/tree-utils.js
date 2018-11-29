import {
  tree,
  hierarchy,
  select,
  linkHorizontal,
} from 'd3';

import {
  DELETED_COLOR,
  NEW_COLOR,
  UPDATED_COLOR,
  NORMAL_COLOR,
  TEXT_COLOR,
} from '../colors';

const WIDTH = 950;

const hasChildren = d => !!(d.children && d.children.length);

const customTree = data => {
  const root = hierarchy(data);

  root.dx = 40;
  root.dy = Math.max(WIDTH / (root.height + 1), 120);

  return tree().nodeSize([root.dx, root.dy])(root);
}

function clearTree(ref) {
  select(ref).selectAll('*').remove();
}

function createTree(data, ref, onMouseEnter, onMouseLeave) {
  const root = customTree(data);

  let x0 = Infinity;
  let x1 = -x0;
  let y0 = Infinity;
  let y1 = -y0;

  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
    if (d.y > y1) y1 = d.y;
    if (d.y < y0) y0 = d.y;
  });

  const svg = select(ref)
      .style('width', `${y1 - y0 + 500}px`)
      .style('height', `${x1 - x0 + 100}px`);

  const g = svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 16)
      .attr('transform', `translate(120,${root.dx - x0})`);

  g.append('g')
    .attr('fill', 'none')
    .attr('stroke', NORMAL_COLOR)
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)
  .selectAll('path')
    .data(root.links())
    .enter().append('path')
      .attr('d', linkHorizontal()
          .x(d => d.y + 100)
          .y(d => d.x));

  const node = g.append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
    .selectAll('g')
    .data(root.descendants().reverse())
    .enter().append('g')
      .attr('transform', d => `translate(${d.y + 100},${d.x})`)
      .attr('class', 'tree__node')
      .on('mouseenter', onMouseEnter)
      .on('mouseleave', onMouseLeave);

  node.append('circle')
      .attr('fill', d => {
        if (d.data.isDeleted) return DELETED_COLOR;
        if (d.data.isNew) return NEW_COLOR;
        if (d.data.isUpdated) return UPDATED_COLOR;
        return NORMAL_COLOR;
      })
      .attr('r', d => hasChildren(d) ? 5 : 3);

  node.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => hasChildren(d) ? -6 : 6)
      .attr('text-anchor', d => hasChildren(d) ? 'end' : 'start')
      .attr('fill', d => d.data.isDeleted ? DELETED_COLOR : TEXT_COLOR)
      .attr('text-decoration', d => d.data.isDeleted ? 'line-through' : null)
      .text(d => d.data.name)
    .clone(true).lower()
      .attr('stroke', 'white');

  return svg.node();
}

export {
  createTree,
  clearTree,
};
