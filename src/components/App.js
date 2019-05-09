import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import HeadTitle from "./HeadTitle";
import Member from "./Member";
import Guest from "./Guest";
import { db } from "../firebaseConnect";
import EditData from "./EditData";
import SlideBar from "./SlideBar";
import ShowData from "./ShowData";
import NavigateURL from "../router/NavigateURL";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <HeadTitle />

          <div id='wrapper'>
            <SlideBar/>
            <div id="content-wrapper">
              <div className="container-fluid">
                <NavigateURL/>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
