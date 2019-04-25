import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postAction";
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }
  static propType = {
    auth: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPost(newPost);
    this.setState({ text: "" });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    } else if (nextProps.errors === null) this.setState({ errors: {} });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a Post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <input type="submit" value="Submit" className="btn btn-dark" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, errors }) => {
  return {
    auth,
    errors
  };
};
export default connect(
  mapStateToProps,
  { addPost }
)(withRouter(PostForm));
