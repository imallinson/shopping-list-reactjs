import React, { Component } from 'react';
import axios from 'axios';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            error: "enter user details"
        }
    }

    logIn = (e) => {
        let actuallyThis = this;
        e.preventDefault();
        axios({
            method: 'put',
            url: "http://localhost:8081/shopping-list/rest/account/check",
            responseType: 'json',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then(function (response) {
            if (response.data.message === "logged in") {
                actuallyThis.props.loginHandler(actuallyThis.state.username);
            } else {
                actuallyThis.setState({
                    error: response.data.message
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    createUser = (e) => {
        let actuallyThis = this;
        e.preventDefault();
        axios({
            method: 'post',
            url: "http://localhost:8081/shopping-list/rest/account/create",
            responseType: 'json',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then(function (response) {
            if (response.data.message === "account sucessfully created") {
                actuallyThis.props.loginHandler(actuallyThis.state.username);
            } else {
                actuallyThis.setState({
                    error: response.data.message
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div className="container" id="loginPage" >
                <div className="row">
                    <div className="col s4"></div>
                    <div className="col s4">
                        <label htmlFor="username">Username</label>
                        <input type="text" value={this.state.username} id="username" onChange={this.handleUsernameChange}></input>
                    </div>
                    <div className="col s4"></div>
                </div>
                <div className="row">
                    <div className="col s4"></div>
                    <div className="col s4">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={this.state.password} id="password" onChange={this.handlePasswordChange}></input>
                        <label className="helper-text">{this.state.error}</label>
                    </div>
                    <div className="col s4"></div>
                </div>
                <div className="row">
                    <div className="col s4"></div>
                    <div className="col center">
                        <button className="btn grey darken-2" id="login" type="button" onClick={this.logIn}>Log In</button>
                    </div>
                    <div className="col center">
                        <button className="btn grey darken-2" id="create" type="button" onClick={this.createUser}>Create Account</button>
                    </div>
                    <div className="col s4"></div>
                </div>
            </div>
        );
    }
}

export default LoginPage;