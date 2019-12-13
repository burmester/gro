import React, { Component } from "react";

import Context from "./defaultContext";

class GlobalState extends Component {

  state = {
    data: [],
    loading: false
  };

  componentDidMount() {
    const data = localStorage.getItem("data");
    if (data) {
      this.setState({
        data: JSON.parse(data)
      });
    }
  }

  removeData = callback => {
    localStorage.clear();
    this.setState({ data: [] }, callback);
  };

  saveData = callback => {
    localStorage.setItem("data", JSON.stringify(this.state.data));
    callback();
  }

  getMatHem = async (query) => {
    const response = await fetch("https://api.mathem.io/product-search/noauth/search/query?q=" + query + "&storeId=10&size=40&index=0&sortTerm=popular&sortOrder=desc",
      {
        "headers": {
          "accept": "application/json, text/plain, */*"
        },
        "method": "GET"
      });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body.products
  }

  getHemkop = async (query) => {
    return false
    /*
    DO NOT WORK, CORS
    const response = await fetch("https://www.hemkop.se/search?avoidCache=1573151389596&q=" + query + "&size=40",
      {
        "method": "GET"
      });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body
    */
  }

  getIca = async (query) => {
    const searchResult = await fetch("https://handla.ica.se/api/search-info/v1/search/skus?storeId=13418&ct=B2C&searchTerm=" + query + "&skipCategories=true&limit=1200");
    const searchResultJson = await searchResult.json();

    const productsIds = searchResultJson.products.slice(0, 10).join()

    const response = await fetch("https://handla.ica.se/api/content/v1/collections/customer-type/B2C/store/ica-kvantum-liljeholmen-id_13418/products?productIds=" + productsIds);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body
  }

  getMat = async (query) => {
    const response = await fetch("https://hv77zjg5js-3.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.33.0)%3B%20Browser&x-algolia-application-id=HV77ZJG5JS&x-algolia-api-key=341b3805a05cef630a2ae8f1619600a4",
      {
        "credentials": "omit",
        "headers": {
          "accept": "application/json", 
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,sv;q=0.7",
          "cache-control": "no-cache", 
          "content-type": "application/x-www-form-urlencoded",
          "pragma": "no-cache", 
          "sec-fetch-mode": "cors", 
          "sec-fetch-site": "cross-site"
        }, 
        "referrer": "https://www.mat.se/", 
        "referrerPolicy": "origin-when-cross-origin",
        "body": "{\"requests\":[{\"indexName\":\"Prod_Product_5_most_sold\",\"params\":\"query="+query+"&optionalFacetFilters=%5B%22featuredProductSearchTerm%3A"+query+"%22%5D&hitsPerPage=12&maxValuesPerFacet=40&page=0&getRankingInfo=false&facets=%5B%22categories.id%22%2C%22categories.lineageIds%22%2C%22labelTags.tag%22%2C%22displayBrand%22%2C%22_tags%22%2C%22id%22%2C%22tagNames%22%5D&tagFilters=ACTIVE%2C-SAMPLE\"}]}",
        "method": "POST",
        "mode": "cors"
      });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body.results.pop().hits
  }


  addItem = async (query, callback) => {
    if (this.state.data.find(item => item.query === query)) {
      callback()
      return false;
    }
    const matHem = await this.getMatHem(query)  
    const hemkop = await this.getHemkop(query)
    const ica = await this.getIca(query)
    const mat = await this.getMat(query)

    this.setState({
      data: [...this.state.data, {
        order: this.state.data.length,
        query: query,
        matHem: matHem,
        hemkop: hemkop,
        ica: ica,
        mat: mat
      }]
    }, callback)
  }

  removeItem = async (removeItem, callback) => {
    this.setState({ data: this.state.data.filter(item => item.query !== removeItem.query) })
  }

  render() {
    return (
      <Context.Provider
        value={{
          data: this.state.data,
          loading: this.state.loading,
          saveData: this.saveData,
          removeData: this.removeData,
          removeItem: this.removeItem,
          addItem: this.addItem
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default GlobalState;
