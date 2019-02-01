import React, { Component } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

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
        e.preventDefault();
        let actuallyThis = this;

        axios({
            method: 'get',
            url: "http://localhost:8081/shopping-list/rest/account/check/" + actuallyThis.state.username,
            responseType: 'json'
        })
            .then(function (response) {
                console.log(response);
                if (response.data === null) {
                    actuallyThis.setState({
                        error: "username does not exist"
                    })
                } else {
                    bcrypt.compare(actuallyThis.state.password, response.data.password, function (err, res) {
                        if (res === true) {
                            sessionStorage.setItem("username", actuallyThis.state.username);
                            actuallyThis.props.loginHandler();
                        } else {
                            actuallyThis.setState({
                                error: "incorrect password"
                            })
                        }
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    createUser = (e) => {
        e.preventDefault();
        let actuallyThis = this;

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(actuallyThis.state.password, salt, function (err, hash) {
                axios({
                    method: 'post',
                    url: "http://localhost:8081/shopping-list/rest/account/create",
                    responseType: 'json',
                    data: {
                        username: actuallyThis.state.username,
                        password: hash
                    }
                })
                    .then(function (response) {
                        if (response.data.message === "account sucessfully created") {
                            sessionStorage.setItem("username", actuallyThis.state.username);
                            actuallyThis.props.loginHandler();
                        } else {
                            actuallyThis.setState({
                                error: response.data.message
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            });
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="container" id="loginPage" >
                <div className="row">
                    <div className="col s4"></div>
                    <div className="col s4">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={this.handleChange}></input>
                    </div>
                    <div className="col s4"></div>
                </div>
                <div className="row">
                    <div className="col s4"></div>
                    <div className="col s4">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}></input>
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