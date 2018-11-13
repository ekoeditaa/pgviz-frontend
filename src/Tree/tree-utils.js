import {
  tree,
  hierarchy,
  select,
  linkHorizontal,
} from 'd3';

const width = 950;

const customTree = data => {
  const root = hierarchy(data);
  root.dx = 18;
  root.dy = width / (root.height + 1);
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
      .style('width', `${y1 - y0 + 240}px`)
      .style('height', `${x1 - x0 + 100}px`);

  const g = svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 16)
      .attr('transform', `translate(120,${root.dx - x0})`);

  g.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)
  .selectAll('path')
    .data(root.links())
    .enter().append('path')
      .attr('d', linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));

  const node = g.append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
    .selectAll('g')
    .data(root.descendants().reverse())
    .enter().append('g')
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .attr('class', 'tree__node')
      .on('mouseenter', onMouseEnter)
      .on('mouseleave', onMouseLeave);

  node.append('circle')
      .attr('fill', d => d.children ? '#336791' : '#999')
      .attr('r', d => d.children ? 5 : 2);

  node.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -6 : 6)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name)
    .clone(true).lower()
      .attr('stroke', 'white');

  return svg.node();
}

export {
  createTree,
  clearTree,
};
