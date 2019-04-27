import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Statistics from './components/Statistics';
import Navbar from './components/Navbar';
import './App.scss';

class App extends Component {
    render() {
        return (
            <Router>
                <Navbar />
                <Route path="/statistics" component={Statistics} />
            </Router>
        );
    }
}

export default App;
