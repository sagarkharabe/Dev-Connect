import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";
class PostFeed extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  };
  render() {
    const { posts } = this.props;
    return posts.map(post => <PostItem key={post._id} post={post} />);
  }
}

export default PostFeed;
