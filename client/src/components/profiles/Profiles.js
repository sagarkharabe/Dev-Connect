import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileAction";
import ProfileItem from "./ProfileItem";
class Profile extends Component {
  static propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else if (profiles.length > 0) {
      profileItems = profiles.map(profile => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h4>No Profiles Found</h4>;
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ profile }) => {
  return { profile };
};
export default connect(
  mapStateToProps,
  { getProfiles }
)(Profile);
