import React, { Component } from 'react';
import './materialize.min.css';
import LoginPage from './LoginPage.js';
import ShoppingList from './ShoppingList.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            username: null
        }
    }

    setUsername = (username) => {
        this.setState({
            username: username
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.username === null ? <LoginPage loginHandler={this.setUsername} /> : <ShoppingList username={this.state.username} /> }
            </div>
        );
    }
}

export default App;
