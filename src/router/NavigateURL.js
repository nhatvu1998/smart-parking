import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ShowData from '../components/ShowData';
import EditData from '../components/EditData';

export default class NavigateURL extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ShowData} />
        <Route path="/chinh-sua" component={EditData} />
      </div>

    )
  }
}
