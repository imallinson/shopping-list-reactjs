import React, { Component } from 'react';
import './materialize.min.css';
import './App.css'
import LoginPage from './LoginPage.js';
import ShoppingList from './ShoppingList.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            username: sessionStorage.getItem("username")
        }
    }

    handleLogin = () => {
        this.setState({
            username: sessionStorage.getItem("username")
        })
    }

    render() {
        return (
            <div className="app">
                 {this.state.username === null ? <LoginPage loginHandler={this.handleLogin} /> : <ShoppingList loginHandler={this.handleLogin} /> }
            </div>
        );
    }
}

export default App;
