import React, { PureComponent } from 'react';
import Dashboard from '../Dashboard';
import Tree from '../Tree';

import './style.css';

class App extends PureComponent {
  state = {
    data: null,
    highlight: null,
  };

  setData = data => this.setState({ data })

  doHighlight = (start, end) => this.setState({
    highlight: [start, end],
  })

  clearHighlight = () => this.setState({ highlight: null })

  render() {
    const { data, highlight } = this.state;

    return (
      <div className="app">
        <h1>Postgre Visualize</h1>
        <Dashboard
          setData={this.setData}
          highlight={highlight}
        />
        <Tree
          data={data}
          doHighlight={this.doHighlight}
        />
      </div>
    );
  }
}

export default App;
