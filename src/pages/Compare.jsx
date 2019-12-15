import React, { Fragment } from 'react';
import { Col, Row, Table } from 'reactstrap';
import Item from '../components/Item';

import Context from '../context/defaultContext';

import ReactGA from 'react-ga'

import history from '../utils/history';


export default class Compare extends React.Component {
  static contextType = Context;

  componentDidMount() {
    ReactGA.pageview("Compare");
  }

  selectItem = (selected, item) => {
    this.context.selectItem(selected, item);
  }

  renderTotal = data => {
    let total = { matHem: 0, ica: 0, mat: 0 }
    data.forEach((query) => {
      total = {
        matHem: total.matHem + query.result[0].items[0].price,
        ica: total.ica + query.result[1].items[0].price,
        mat: total.mat + query.result[2].items[0].price,
      }
    })
    return (
      <Fragment>
        <td><b>Totalt</b></td>
        <td>{total.ica.toFixed(2)}</td>
        <td>{total.matHem.toFixed(2)}</td>
        <td>{total.mat.toFixed(2)}</td>
      </Fragment>
    )
  }

  render() {
    let data = this.context.data.sort((a, b) => {
      if (a.query.toLowerCase() < b.query.toLowerCase()) return -1
      if (a.query.toLowerCase() > b.query.toLowerCase()) return 1
      return 0;
    })
    return (
      <Fragment>
        <Row>
          <Col className="button-bar">
            <button onClick={() => {
              history.push('/')
            }}>Lägg till fler</button>
            <button className="button-destuctive" onClick={() => this.context.removeData(() => {
              history.push('/')
            })}>Töm</button>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr className="sticky">
              <th>Produkt</th>
              <th>MatHem</th>
              <th>Ica</th>
              <th>Mat.se</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>
                  <h3>{item.query}</h3>
                </td>
                <Item
                  name={item.items.matHem.name}
                  price={item.items.matHem.price.toFixed(2)}
                  selectItem={e => this.selectItem(item.items.matHem, item)}
                  isSelected={item.items.matHem.selected}
                  image={item.items.matHem.image} />
                  <Item
                  name={item.items.ica.name}
                  price={item.items.ica.price.toFixed(2)}
                  selectItem={e => this.selectItem(item.items.ica, item)}
                  isSelected={item.items.ica.selected}
                  image={item.items.ica.image} />
                  <Item
                  name={item.items.mat.name}
                  price={item.items.mat.price.toFixed(2)}
                  selectItem={e => this.selectItem(item.items.mat, item)}
                  isSelected={item.items.mat.selected}
                  image={item.items.mat.image} />
              </tr>
            ))
            }
            <tr className="sticky">
              {this.renderTotal(data)}
            </tr>
          </tbody>
        </Table>
      </Fragment>
    );
  }
}
