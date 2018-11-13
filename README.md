# Postgres Visualizer

> This repository contains setup instructions and basic implementation of Postgres Visualizer frontend. Please refer to API server repository [here](https://github.com/ekoeditaa/pgviz).

## Main Dependencies

- React
- D3.js

## Setting up

1. Ensure `yarn` is installed on the machine.
2. Set this root directory as the current directory, and run `yarn install`.
3. Run `yarn start`, it will start development server.
4. To build for production, run `yarn build`. The output resides in `build` directory.

## Implementations

React is used as a framework, mainly to render the whole web application. D3 on the other hand is used for rendering complex diagrams including tree. This tree rendering utility is set as one of React component - `<Tree/>` to render the Query Execution Plan (QEP). The rest of the components - text highlighting, api request, inputs, details popper are all handled in React.
