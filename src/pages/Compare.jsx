import React, { Fragment } from 'react';
import { Col, Row, Table } from 'reactstrap';
import Levenshtein from 'fast-levenshtein';
import Item from '../components/Item';

import Context from '../context/defaultContext';

import ReactGA from 'react-ga'

import history from '../utils/history';


export default class Compare extends React.Component {
  static contextType = Context;

  componentDidMount() {
    ReactGA.pageview("Compare");
  }

  tableRow = [(<tr className="sticky">
    <th>
      matHemItem.name
    </th>
    <th>
      icaItem.product.name
    </th>
    <th>
      diffcomparePrice
    </th>
    <th>
      diffPrice
    </th>
    <th>
      levName
    </th>
    <th>
      levCat
    </th>
    <th>
      levQuery
    </th>
    <th>
      levQueryMatHem
    </th>
    <th>
      total
    </th>
  </tr>)];


  compare = (data) => {
    const pointAlgorithm = (diffcomparePrice, diffPrice, levName, levCat, levQuery, levQueryMatHem) => {
      return diffcomparePrice + diffPrice + levName + levCat * 10 + levQuery + levQueryMatHem
    }
    data.forEach(query => {
      query.matHem.forEach((matHemItem, i) => {
        const levQueryMatHem = Levenshtein.get(query.query, matHemItem.name);
        matHemItem.icaItem = { matHemItem: { points: 10000 } };
        query.ica.forEach((icaItem, j) => {
          const diffPrice = Math.round(Math.abs(icaItem.price.listPrice - matHemItem.price));
          const diffcomparePrice = Math.round(Math.abs(icaItem.price.comparePrice - matHemItem.comparisonPrice));
          const levName = Levenshtein.get(matHemItem.name, icaItem.product.name);
          const levCat = Levenshtein.get(matHemItem.department.name, icaItem.product.categories[0].categoryPath[1].name);
          const levQuery = Levenshtein.get(query.query, icaItem.product.name);
          if (query.query === "Mjölk" && matHemItem.name === "iKaffe") {
            this.tableRow.push((
              <tr>
                <td>
                  {matHemItem.name}
                </td>
                <td>
                  {icaItem.product.name}
                </td>
                <td>
                  {diffcomparePrice}
                </td>
                <td>
                  {diffPrice}
                </td>
                <td>
                  {levName}
                </td>
                <td>
                  {levCat}
                </td>
                <td>
                  {levQuery}
                </td>
                <td>
                  {levQueryMatHem}
                </td>
                <td>{pointAlgorithm(diffcomparePrice, diffPrice, levName, levCat, levQuery, levQueryMatHem)}</td>
              </tr>
            ))
          }
          icaItem.matHemItem = { points: pointAlgorithm(diffcomparePrice, diffPrice, levName, levCat, levQuery, levQueryMatHem) }
          if (icaItem.matHemItem.points < matHemItem.icaItem.matHemItem.points) {
            matHemItem.icaItem = { ...icaItem }
          }
        })
        matHemItem.matItem = { matHemItem: { points: 10000 } };
        query.mat.forEach((matItem, j) => {
          const diffPrice = Math.abs(matItem.price - matHemItem.price);
          const diffcomparePrice = Math.abs(matItem.comparisonPrice - matHemItem.comparisonPrice);
          const levName = Levenshtein.get(matHemItem.name, matHemItem.name);
          const levCat = Levenshtein.get(matHemItem.department.name, matItem.categories[0].firstLevelParentCategoryName);
          const levQuery = Levenshtein.get(query.query, matItem.name);
          matItem.matHemItem = { points: pointAlgorithm(diffcomparePrice, diffPrice, levName, levCat, levQuery, levQueryMatHem) }
          if (matItem.matHemItem.points < matHemItem.matItem.matHemItem.points) {
            matHemItem.matItem = { ...matItem }
          }
        })
        matHemItem.points = matHemItem.matItem.matHemItem.points + matHemItem.icaItem.matHemItem.points
      })
    })
    return data;
  }

  sort = (data) => {
    data.forEach(query => {
      query.matHem.sort((a, b) => {
        if (a.points < b.points) return -1
        if (a.points > b.points) return 1
        return 0;
      })
    })
  }

  renderTotal = () => {
    let total = { ica: 0, matHem: 0, mat: 0 }
    this.context.data.forEach((item) => {
      total = {
        ica: total.ica + item.ica[0].price.listPrice,
        matHem: total.matHem + item.matHem[0].price,
        mat: total.mat + item.mat[0].price
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
    let data = this.compare(this.context.data);
    this.sort(data);
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
        {false && (
          <Table>
            {this.tableRow}
          </Table>
        )}
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
                  name={item.matHem[0].name}
                  price={item.matHem[0].price.toFixed(2)}
                  image={item.matHem[0].images.SMALL} />
                <Item
                  name={item.matHem[0].icaItem.product.name}
                  price={item.matHem[0].icaItem.price.listPrice.toFixed(2)}
                  image={"https://assets.icanet.se/t_product_medium_v1,f_auto/" + item.matHem[0].icaItem.product.imageId + ".jpg"} />
                <Item
                  name={item.matHem[0].matItem.name}
                  price={item.matHem[0].matItem.price.toFixed(2)}
                  image={item.matHem[0].matItem.imageUrl} />
              </tr>
            ))
            }
            <tr className="sticky">
              {this.renderTotal()}
            </tr>
          </tbody>
        </Table>
      </Fragment>
    );
  }
}
