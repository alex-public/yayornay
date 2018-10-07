import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './HomeView.css';

class HomeView extends Component {
    componentDidMount() {
        const swal = window.swal;
        swal("Good job!", "You started a poll", "success");
    }

    render() {
      return (
        <div>
            <h2>Home</h2>
            <Link to="/startpoll">Create your own Poll</Link>
        </div>
      );
    }
  }
  
  export default HomeView;