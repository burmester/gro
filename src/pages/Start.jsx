import React, { Fragment } from 'react';

import Context from '../context/defaultContext';

import ReactGA from 'react-ga'


export default class Start extends React.Component {
  static contextType = Context;

  componentDidMount() {
    ReactGA.pageview("Start");
  }

  render() {
    return (
      <Fragment>
        <h1>Start</h1>
      </Fragment>
      )
  }
}
