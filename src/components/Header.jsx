import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, Col, Row } from 'reactstrap';

import history from '../utils/history';

import Context from '../context/defaultContext';

class Header extends Component {
  static contextType = Context;

  render() {
    return (
      <Fragment>
        <Row className="header">
          <Col>
            Codename Gro
          </Col>
        </Row>
        <Row className="menu">
          <Col>
            <ButtonGroup>
              <Button outline color="danger" size="sm" onClick={() => history.push('/')}>
                Start
              </Button>
              <Button outline size="sm" onClick={() => history.push('/settings')}>
                Settings
                </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Fragment>
    )
  }
}


export default Header;