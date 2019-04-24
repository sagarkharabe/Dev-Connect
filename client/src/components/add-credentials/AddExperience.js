import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profileAction";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import PropTypes from "prop-types";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
  }
  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  render() {
    const { errors } = this.state;
    return <div />;
  }
}

const mapStateToProps = ({ profile, errors }) => {
  return {
    profile,
    errors
  };
};

export default connect(
  mapStateToProps,
  {}
)(withRouter(AddExperience));
