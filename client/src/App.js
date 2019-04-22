import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Login";
class App extends Component {
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

export default App;
