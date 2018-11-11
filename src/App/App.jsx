import React, { PureComponent } from 'react';
import Dashboard from '../Dashboard';
import Tree from '../Tree';

import './style.css';

class App extends PureComponent {
  state = {
    data: null,
    highlight: null,
    details: null,
    detailsPosition: null,
  };

  setData = data => this.setState({ data })

  setDetails = details => this.setState({ details })

  setDetailsPosition = detailsPosition => this.setState({ detailsPosition })

  doHighlight = highlight => this.setState({ highlight })

  render() {
    const {
      data,
      details,
      detailsPosition,
      highlight,
    } = this.state;

    return (
      <div className="app">
        <h1>Postgres Visualizer</h1>
        <Dashboard
          setData={this.setData}
          highlight={highlight}
          details={details}
          detailsPosition={detailsPosition}
        />
        <Tree
          data={data}
          doHighlight={this.doHighlight}
          setDetails={this.setDetails}
          setDetailsPosition={this.setDetailsPosition}
        />
      </div>
    );
  }
}

export default App;
