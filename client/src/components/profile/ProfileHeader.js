import React, { Component } from "react";

export default class ProfileHeader extends Component {
  render() {
    return (
      <div class="row">
        <div class="col-md-12">
          <div class="card card-body bg-info text-white mb-3">
            <div class="row">
              <div class="col-4 col-md-3 m-auto">
                <img
                  class="rounded-circle"
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                  alt=""
                />
              </div>
            </div>
            <div class="text-center">
              <h1 class="display-4 text-center">John Doe</h1>
              <p class="lead text-center">Developer at Microsoft</p>
              <p>Seattle, WA</p>
              <p>
                <a class="text-white p-2" href="#">
                  <i class="fas fa-globe fa-2x" />
                </a>
                <a class="text-white p-2" href="#">
                  <i class="fab fa-twitter fa-2x" />
                </a>
                <a class="text-white p-2" href="#">
                  <i class="fab fa-facebook fa-2x" />
                </a>
                <a class="text-white p-2" href="#">
                  <i class="fab fa-linkedin fa-2x" />
                </a>
                <a class="text-white p-2" href="#">
                  <i class="fab fa-instagram fa-2x" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
