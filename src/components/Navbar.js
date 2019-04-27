import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">

                <a className="navbar-brand" href="#"><i class="fas fa-store"></i></a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                        data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" 
                                id="navbarCustomerDropdown" data-toggle="dropdown" 
                                aria-haspopup="true" aria-expanded="false">
                                Customer
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarCustomerDropdown">
                                <Link className="dropdown-item" to="/">... TODO</Link>
                            </div>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" 
                                id="navbarWorkerDropdown" data-toggle="dropdown" 
                                aria-haspopup="true" aria-expanded="false">
                                Worker
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarWorkerDropdown">
                                <Link className="dropdown-item" to="/">... TODO</Link>
                            </div>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" 
                                id="navbarDropdownMenuLink" data-toggle="dropdown" 
                                aria-haspopup="true" aria-expanded="false">
                                Manager
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/statistics">Statistics</Link>
                            </div>
                        </li>

                    </ul>

                </div>

            </nav>
        );
    }
}

export default Navbar;