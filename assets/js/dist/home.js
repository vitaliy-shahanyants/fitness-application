import React from 'react';
import './home.css';
const Home = () =>(
  <div className="card" style={{
      'backgroundImage':"url('../../assets/img/fitness-594143_1920.jpg')",
      'marginTop':'0',
      'zIndex':'-1'}}>
    <h1 className="text-center intro-text">Welcome</h1>
    {/* image comes from: https://pixabay.com/en/fitness-dumbbells-training-594143/ */}
    <p className="text-center">
      {/* <img width="40%" className="img-responsive text-center" src="../../assets/img/fitness-594143_1920.jpg" /> */}
    </p>
    <div className="card-block">
      <div className="text-center intro-text">
        Welcome to True Athlete Application. Here we will train you and turn ou into an athlete
      </div>
      <div className="text-center intro-text">
        This application will provide you with a normal workout routine, which you can customize,
        or create a new one that matches your needs. You may also share you workout routine with
        other users, or another user's workout routine. You can seearch for a workout routine that other
        users posted.
      </div>
    </div>

  </div>
)

export default Home;
