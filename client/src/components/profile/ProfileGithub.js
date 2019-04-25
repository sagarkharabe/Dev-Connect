import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "40d5a1d8903674cabd46",
      clientSecret: "00d1e04e4bd6fd012eaf1eb53d82ab8d9125d255",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }
  static propTypes = {
    username: PropTypes.string.isRequired
  };
  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          repos: data
        });
      })
      .catch(err => {
        console.log("ERR -- ", err);
      });
  }
  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a className="text-info" target="_black" href={repo.html_url}>
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}
