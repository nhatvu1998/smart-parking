import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

export default class SlideBar extends Component {
  render() {
    return (
      <ul className="sidebar navbar-nav">
  <li className="nav-item active">
    <NavLink className="nav-link" to="/">
      <i className="fas fa-home" />
      <span> Home</span>
    </NavLink>
  </li>
  
  <li className="nav-item active">
    <NavLink className="nav-link" to="/chinh-sua">
      <i className="fas fa-user-edit" />
      <span> Sửa thông tin</span>
    </NavLink>
  </li>
  
</ul>

    )
  }
}
