import React from 'react';
const About = ()=>(
  <div className="jumbotron">
    <h1 className="text-center">About</h1>
    <div className="row">
        <div className="col-md-6">
          <p>True Athlete is about getting up and learning new ways to improve your body</p>
          <p>In this application you create you own personal workout routine, as well as view, or to your library other user's workout routines. You can customize your workout routines to fit your goals.</p>
          <p>Other features of this application are creating events, where you can meet with your friends.</p>
        </div>
        <div className="col-md-6">
          {/* image comes from: https://pixabay.com/en/physiotherapy-weight-training-595529/*/}
          <img width="50%" src="../../assets/img/physiotherapy-595529_1920.jpg" />
        </div>
    </div>
  </div>
);
export default About;
