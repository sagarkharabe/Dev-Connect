import React, { Component } from "react";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/postAction";
import { Link } from "react-router-dom";
import PostFeed from "./PostFeed";
class Post extends Component {
  static propType = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.getPosts();
  }
  handleLogout = () => {};
  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ post }) => {
  return {
    post
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Post);
