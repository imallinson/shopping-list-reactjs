import React, { Component } from 'react';
import './materialize.min.css';
import './App.css'
import LoginPage from './LoginPage.js';
import ShoppingList from './ShoppingList.js';

class App extends Component {
    render() {
        return (
            <div className="app">
                {sessionStorage.getItem("username") === null ? <LoginPage /> : <ShoppingList /> }
            </div>
        );
    }
}

export default App;
