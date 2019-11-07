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

  getData = async (query, callback) => {
    const response = await fetch("/.netlify/functions/callback?code=" + query, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({ data: body }, callback);
  }

  addItem = async (query, callback) => {
    this.setState({ data: [...this.state.data, query], callback })
  }

  removeItem = async (removeItem, callback) => {
    this.setState({data: this.state.data.filter(item => item !== removeItem)})
  }

  render() {
    return (
      <Context.Provider
        value={{
          data: this.state.data,
          loading: this.state.loading,
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
