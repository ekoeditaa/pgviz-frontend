import shallowEq from 'shallowequal';

/**
 * Multi-root tree for D3.js with diffing.
 *
 * @param {Tree} tree
 * @param {Tree} [prevTree]
 * @param {object} [context]
 */export const transformToTree = (tree, prevTree = null, context = {}) => {
  const {
    Plans: children = [],
    start_index: start,
    end_index: end,
    ...details
  } = tree;

  const transformedChildren = [];
  children.forEach((child) => {
    transformedChildren.push(...transformToTree(child, null, context));
  });

  if (!prevTree) {
    const result = {
      ...context,
      name: details['Node Type'],
      details,
      children: transformedChildren,
    };

    if (start !== undefined && end !== undefined && !context.isDeleted) {
      result.highlight = [start, end];
    }

    return [result];
  }

  const {
    Plans: prevChildren = [],
    start_index: unusedStart,
    end_index: unusedEnd,
    ...prevDetails
  } = prevTree;

  // Check by its Node Type, if different, it is assumed to be completely replaced.
  if (details['Node Type'] !== prevDetails['Node Type']) {
    const result = {
      isNew: true,
      name: details['Node Type'],
      details,
      children: children.map(child => transformToTree(child, null, { isNew: true })[0]),
    };

    if (start !== undefined && end !== undefined) {
      result.highlight = [start, end];
    }

    const prevResult = {
      isDeleted: true,
      name: prevDetails['Node Type'],
      details: prevDetails,
      children: prevChildren.map(child => transformToTree(child, null, { isDeleted: true })[0]),
    };

    return [result, prevResult];
  }

  // If Node Types are the same, compare their details, then recurse children
  const result = {
    name: details['Node Type'],
    details: { ...prevDetails },
  };
  Object
    .entries(details)
    .forEach(([key, value]) => {
      if (prevDetails[key] === undefined) {
        result.isUpdated = true;
        result.details[`+ ${key}`] = value;
      }

      else if (!shallowEq(prevDetails[key], value)) {
        result.isUpdated = true;
        delete result.details[key];
        result.details[`+ ${key}`] = value;
        result.details[`- ${key}`] = prevDetails[key];
      }
    });

  if (start !== undefined && end !== undefined) {
    result.highlight = [start, end];
  }

  const diffedChildren = [];

  children.forEach((child, idx) => {
    const diffedChilds = transformToTree(
      child,
      prevChildren[idx],
      prevChildren[idx] && { isNew: true },
    );
    diffedChildren.push(...diffedChilds);
  });

  const remainings = prevChildren
    .slice(children.length)
    .map(child => transformToTree(child, null, { isDeleted: true })[0]);

  diffedChildren.push(...remainings);

  result.children = diffedChildren;

  return [result];
};
