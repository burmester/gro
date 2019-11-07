import React, { Fragment } from 'react';
import { Col, Row, Table } from 'reactstrap';

import Context from '../context/defaultContext';

import ReactGA from 'react-ga'

import history from '../utils/history';


export default class Compare extends React.Component {
  static contextType = Context;

  componentDidMount() {
    ReactGA.pageview("Compare");
  }

  compare = () => {
   const result = this.context.data.map(item => {
      const common = item.matHem.find(matHemProduct => {
        let ica = item.ica.find(icaProduct => icaProduct.id === matHemProduct.gtin)
        if (ica) {
          let mat = item.mat.find(matProduct => matProduct.ean === matHemProduct.gtin)
          if (mat) return true
        }
        return false
      })
      if(common) return common
      return false
})
    console.log(result)
    return result
  }

  render() {
    this.compare();
    return (
      <Fragment>
        <Row>
          <Col>
            <h1>Compare</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <button onClick={() => this.context.removeData(() => {
              history.push('/')
            })}>Töm</button>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Ica</th>
              <th>MatHem</th>
              <th>Mat.se</th>
            </tr>
          </thead>
          <tbody>
          {this.context.data.map((item, i) => (
            <tr key={i}>
              <td>{item.query}</td>
              <td>{item.ica[0].product.name}<br /> {item.ica[0].price.listPrice}</td>
              <td>{item.matHem[0].name} <br /> {item.matHem[0].price}</td>
              <td>{item.mat[0].name}<br /> {item.mat[0].price}</td>
            </tr>
          ))
          }
          </tbody>
        </Table>
      </Fragment>
    );
  }
}
