import React, { Fragment } from 'react';

import Context from '../context/defaultContext';
import Search from '../components/Search';

import ReactGA from 'react-ga'

import history from '../utils/history';

export default class Start extends React.Component {
  static contextType = Context;

  componentDidMount() {
    ReactGA.pageview("Start");
  }

  addItem = query => {
    this.context.addItem(query)
  }

  render() {
    return (
      <Fragment>
        <h1>Start</h1>
        <Search addItem={this.addItem} />
        {this.context.data.map((item, i) => (
          <div key={i}>
            {item.query}
          </div>
        ))
        }
        <div>
          <button onClick={() => this.context.saveData(() => {
            history.push('/compare')
          })}>Jämför</button>
        </div>
      </Fragment>
    )
  }
}
