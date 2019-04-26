import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postAction";
import { Link } from "react-router-dom";
class CommentItem extends Component {
  static propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
  };
  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };
  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div class="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="/profile">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={() => this.onDeleteClick(postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
