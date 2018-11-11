import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextHighlight from '../TextHighlight';
import { sendQuery } from './utils';

import './style.css';

class Dashboard extends PureComponent {
  state = {
    query: '',
    sentQuery: null,
    loading: false,
  };

  setQuery = e => this.setState({ query: e.target.value });

  executeQuery = async () => {
    const { query } = this.state;
    const { setData } = this.props;

    this.setState({ loading: true });
    const data = await sendQuery(query);

    setData(data);
    this.setState({ sentQuery: query });
  }

  render() {
    const { highlight } = this.props;
    const { query, sentQuery } = this.state;

    return (
      <div className="dashboard">
        <textarea
          className="dashboard__query-input"
          placeholder="PostgreSQL query"
          value={query}
          onChange={this.setQuery}
        />
        <button
          type="button"
          onClick={this.executeQuery}
        >
          Explain
        </button>
        <hr />
        <div className="dashboard__sent-query">
          {sentQuery && (
            <TextHighlight range={highlight}>
              {sentQuery}
            </TextHighlight>
          )}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  highlight: PropTypes.arrayOf(PropTypes.number),
  setData: PropTypes.func.isRequired,
};

export default Dashboard;
