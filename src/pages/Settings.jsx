import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import Switch from "react-switch";

import Context from '../context/defaultContext';

import ReactGA from 'react-ga'


export default class Settings extends React.Component {
  static contextType = Context;

  componentDidMount() {
    ReactGA.pageview("Settings");
  }

  render() {
    const data = this.context.data;
    if (!data) return false
    return (
      <Fragment>
        <Row>
          <Col xs="12" md="4">
            <h3>Dina konton</h3>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
