
import React from 'react';
import { Link } from 'react-router-dom';
//import './book.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to BookNest 📚</h1>
      <p>
        Buy your favorite books online with ease. Explore a wide variety of genres and track your reading history.
      </p>
      <div className="home-buttons">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
        <Link to="/books"><button>Browse Books</button></Link>
      </div>
    </div>
  );
};

export default Home;
