import React, { Component } from "react";
import { getPost } from "../../actions/postAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
class Post extends Component {
  static propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPost(id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      console.log(post.comments);
      postContent = (
        <div className="">
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
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
  { getPost }
)(Post);
