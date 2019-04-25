import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import ProfileHeader from "./ProfileHeader";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { getProfileByHandle } from "../../actions/profileAction";
class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="">
          <div className="row">
            <div className="col-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-6" />
          </div>
          {/* <!-- Profile Header --> */}
          <ProfileHeader profile={profile} />

          {/* <!-- Profile About --> */}
          <ProfileAbout profile={profile} />
          {/*   
<!-- Profile Creds --> */}
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />

          {/* <!-- Profile Github --> */}
          {profile.githubUserName ? (
            <ProfileGithub username={profile.githubUserName} />
          ) : null}
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ profile }) => {
  return {
    profile
  };
};
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
