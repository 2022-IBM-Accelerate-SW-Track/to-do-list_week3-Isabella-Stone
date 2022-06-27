import React, { Component } from "react";
import "./About.css";
import isabella_pic from "../assets/isabella_pic.jpg";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src = {isabella_pic}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Isabella Stone</div>
            <div className="brief_description">
              <ul>
                  <li>I am a rising junior at Stevens Institute of Technology</li>
                  <li>My major is computer science</li>
                  <li>I am from Staten Island, NY</li>
                  <li>My favorite color is pink</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
