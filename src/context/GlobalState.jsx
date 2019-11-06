import React, { Component } from "react";

import Context from "./defaultContext";
import history from "../utils/history";

class GlobalState extends Component {

  state = {
    data: undefined,
    loading: false
  };

  componentDidMount() {
    const data = localStorage.getItem("data");
    if (data) {
      this.setState({
        data: JSON.parse(data),
      }, () => history.push("/"));
    }
  }

  removeData = callback => {
    localStorage.clear();
    this.setState({ data: undefined }, callback);
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


  render() {
    return (
      <Context.Provider
        value={{
          data: this.state.data,
          loading: this.state.loading,
          removeData: this.removeData,
          saveData: this.saveData,
          getData: this.getData,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default GlobalState;
