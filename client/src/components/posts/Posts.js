import React, { Component } from "react";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { addPost } from "../../actions/postAction";
import { Link } from "react-router-dom";
class Post extends Component {
  static propType = {
    post: PropTypes.object.isRequired
  };
  handleLogout = () => {};
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ post }) => {
  return {};
};

export default connect(
  mapStateToProps,
  { addPost }
)(Post);
