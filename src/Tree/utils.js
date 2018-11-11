export const transformToTree = ({
  Plans: children,
  start_index: start,
  end_index: end,
  ...details,
}) => {
  const result = {
    name: details['Node Type'],
    details,
  };

  if (start !== undefined && end !== undefined) {
    result.highlight = [start, end];
  }

  if (children) {
    result.children = children.map(child => transformToTree(child));
  }

  return result;
};
