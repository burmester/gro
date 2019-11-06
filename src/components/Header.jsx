import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, Col, Row } from 'reactstrap';
import ReactSVG from 'react-svg'

import ReactGA from 'react-ga';

import history from '../utils/history';

import Context from '../context/defaultContext';

class Header extends Component {
  static contextType = Context;

  render() {
    return (
      <Fragment>
        <Row className="header d-none">
          <Col>
            <ReactSVG svgStyle={{
              minWidth: "120px",
              maxWidth: "200px",
              width: "30%",
              height: "auto"
            }} svgClassName="logo" src={'./images/normal.svg'} />
          </Col>
        </Row>
        <Row className="menu">
          <Col>
            <ButtonGroup>
              <Button outline size="sm" onClick={() => {
                ReactGA.event({
                  category: 'Menu',
                  action: 'Settings'
                });
                history.push('/settings');
              }}>
                Inställningar
              </Button>
              <Button outline color="danger" size="sm" onClick={() => this.context.removeData(() => {
                ReactGA.event({
                  category: 'Menu',
                  action: 'Remove data'
                });
                history.push('/');
              })}>
                Töm innehav
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Fragment>
    )
  }
}


export default Header;