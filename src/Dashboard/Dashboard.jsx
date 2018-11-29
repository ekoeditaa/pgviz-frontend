import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextHighlight from '../TextHighlight';
import Details from '../Details';
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

    if (data) setData(data);

    this.setState({ sentQuery: query });
  }

  render() {
    const { highlight, details, detailsPosition } = this.props;
    const { query, sentQuery } = this.state;

    return (
      <div className="dashboard">
        <div className="dashboard__col">
          <textarea
            className="dashboard__query-input"
            placeholder="PostgreSQL query"
            value={query}
            onChange={this.setQuery}
          />
          <button
            type="button"
            className="dashboard__explain-button"
            onClick={this.executeQuery}
          >
            Explain
          </button>
        </div>
        <div className="dashboard__col outlined dashboard__sent-query">
          <code>
            {sentQuery && (
              <TextHighlight range={highlight}>
                {sentQuery}
              </TextHighlight>
            )}
          </code>
        </div>
        {details && (
          <div
            className="dashboard__details"
            style={detailsPosition}
          >
            <Details data={details} />
          </div>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  highlight: PropTypes.arrayOf(PropTypes.number),
  setData: PropTypes.func.isRequired,
  details: PropTypes.object,
  detailsPosition: PropTypes.object,
};

export default Dashboard;
