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
        var actuallyThis = this;
        e.preventDefault();
        axios({
            method: 'put',
            url: 'http://localhost:8081/meal-planner/rest/account/check',
            responseType: 'json',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then(function (response) {
            if (response.data.message === "logged in") {
                actuallyThis.props.handleLogin(actuallyThis.state.username);
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
        var actuallyThis = this;
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:8081/meal-planner/rest/account/create',
            responseType: 'json',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then(function (response) {
            if (response.data.message === "account sucessfully created") {
                actuallyThis.props.handleLogin(actuallyThis.state.username);
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
            <div className="container" >
                <div className="row">
                    <div className="col s4"></div>
                    <div className="col s4">
                        <label htmlFor="username">Username</label>
                        <input className="validate" type="text" id="username" onChange={this.handleUsernameChange}></input>
                    </div>
                    <div className="col s4"></div>
                </div>
                <div className="row">
                    <div className="col s4"></div>
                    <div className="col s4">
                        <label htmlFor="password">Password</label>
                        <input className="validate" type="password" id="password" onChange={this.handlePasswordChange}></input>
                        <label className="helper-text">{this.state.error}</label>
                    </div>
                    <div className="col s4"></div>
                </div>
                <div className="row">
                    <div className="col s2 push-s4 center">
                        <button className="btn grey darken-2" type="button" onClick={this.logIn}>Log In</button>
                    </div>
                    <div className="col s3 push-s3 center">
                        <button className="btn grey darken-2" type="button" onClick={this.createUser}>Create Account</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;