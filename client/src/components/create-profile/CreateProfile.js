import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import PropTypes from "prop-types";
import { createProfile } from "../../actions/profileAction";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      location: "",
      website: "",
      status: "",
      skills: "",
      githubUserName: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedIn: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }
  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const profile = {
      handle: this.state.handle,
      company: this.state.company,
      location: this.state.location,
      website: this.state.website,
      status: this.state.status,
      skills: this.state.skills,
      githubUserName: this.state.githubUserName,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedIn: this.state.linkedIn,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profile, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
    let SocialInputs;
    if (displaySocialInputs) {
      SocialInputs = (
        <div className="">
          <InputGroup
            placeholder="FaceBook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedIn"
            icon="fab fa-linkedin"
            onChange={this.onChange}
            error={errors.linkedIn}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            onChange={this.onChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      );
    }
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learner", value: "Student or Learner" },
      { label: "Instructor", value: "Instructor" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some info to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.handleChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc "
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                  error={errors.status}
                  options={options}
                  info="Give us and idea of where you are at your career "
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleChange}
                  error={errors.company}
                  info="Could be your own company or one you work for. "
                />
                <TextFieldGroup
                  placeholder="http://example.com"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleChange}
                  error={errors.website}
                  info=" "
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                  error={errors.location}
                  info=""
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.handleChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP) with no spaces."
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubUserName"
                  value={this.state.githubUserName}
                  onChange={this.handleChange}
                  error={errors.githubUserName}
                  info="If you want your latest github repos to appear on your profile, include your github username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio .."
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  error={errors.bio}
                  info="Tell us little bit about yourself. "
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Networks Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {SocialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
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
  { createProfile }
)(withRouter(CreateProfile));
