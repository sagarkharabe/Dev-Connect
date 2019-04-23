import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";
class Dashboard extends Component {
  static propTypes = {};
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    return <div />;
  }
}

export default connect(
  null,
  { getCurrentProfile }
)(Dashboard);
