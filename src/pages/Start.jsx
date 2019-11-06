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
        <h2>Välkommen</h2>
        <p>
          Här kan du se ditt innehav.
        </p>
      </Fragment>)
  }
}
