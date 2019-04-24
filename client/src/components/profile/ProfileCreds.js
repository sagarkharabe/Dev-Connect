import React, { Component } from "react";

export default class ProfileCreds extends Component {
  render() {
    return (
      <div class="row">
        <div class="col-md-6">
          <h3 class="text-center text-info">Experience</h3>
          <ul class="list-group">
            <li class="list-group-item">
              <h4>Microsoft</h4>
              <p>Oct 2011 - Current</p>
              <p>
                <strong>Position:</strong> Senior Developer
              </p>
              <p>
                <strong>Description:</strong> Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Unde doloribus dicta enim
                excepturi laborum voluptatem nam provident quisquam facere.
                Quae?
              </p>
            </li>
            <li class="list-group-item">
              <h4>Sun Microsystems</h4>
              <p>Oct 2004 - Nov 2011</p>
              <p>
                <strong>Position: </strong> Systems Admin
              </p>
              <p>
                <p>
                  <strong>Location: </strong> Miami, FL
                </p>
                <strong>Description: </strong> Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Unde doloribus dicta enim
                excepturi laborum voluptatem nam provident quisquam facere.
                Quae?
              </p>
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <h3 class="text-center text-info">Education</h3>
          <ul class="list-group">
            <li class="list-group-item">
              <h4>Univeresity Of Washington</h4>
              <p>Sep 1993 - June 1999</p>
              <p>
                <strong>Degree: </strong>Masters
              </p>
              <p>
                <strong>Field Of Study: </strong>Computer Science
              </p>

              <p>
                <strong>Description:</strong> Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Unde doloribus dicta enim
                excepturi laborum voluptatem nam provident quisquam facere.
                Quae?
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
