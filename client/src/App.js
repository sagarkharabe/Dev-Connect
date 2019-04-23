import React, { Component } from "react";
import "./App.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logout } from "./actions/authAction";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    //check for token
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.getItem("jwtToken"));
      const decoded = jwt_decode(localStorage.jwtToken);
      this.props.setCurrentUser(decoded);
      //check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.props.logout();
      }
    }
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Route path="/" exact component={Landing} />
          <div className="container">
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default connect(
  null,
  { setCurrentUser, logout }
)(App);
