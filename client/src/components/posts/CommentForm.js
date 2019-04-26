import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postAction";
class CommentForm extends Component {
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
    errors: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addComment(postId, newComment);
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
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post.."
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
  { addComment }
)(CommentForm);
