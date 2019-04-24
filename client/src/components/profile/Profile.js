import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import ProfileHeader from "./ProfileHeader";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";

class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };
  render() {
    return (
      <div class="profile">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-6">
                  <Link to="/profiles" class="btn btn-light mb-3 float-left">
                    Back To Profiles
                  </Link>
                </div>
                <div class="col-6" />
              </div>

              {/* <!-- Profile Header --> */}
              <ProfileHeader />

              {/* <!-- Profile About --> */}
              <ProfileAbout />
              {/*   
            <!-- Profile Creds --> */}
              <ProfileCreds />

              {/* <!-- Profile Github --> */}
              <ProfileGithub />
            </div>
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
  {}
)(Profile);
