import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Home from './Home'

class NavBar extends React.Component {
    render() {
        return (
            <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to='/home' className="nav-link">Home </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Route path="/home" component={Home} />
        </Router>
        );
    }
}

export default NavBar