export const transformToTree = ({
  'Node Type': name,
  Plans: children,
  start_index: start,
  end_index: end,
  ...data,
}) => {
  const result = {
    name,
    start,
    end,
    children: Object
      .entries(data)
      .map(([name, value]) => {
        if (Array.isArray(value)) {
          return {
            name,
            children: value.map(child => transformToTree(child)),
          };
        }

        return { name: `${name}: ${value}` };
      }),
  };

  return result;
};
