import React, { Component } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null
        }
    }

    logIn = (e) => {
        e.preventDefault();

        let actuallyThis = this;

        axios({
            method: 'get',
            url: "http://35.189.92.93:8080/shopping-list/rest/account/check/" + actuallyThis.state.username,
            responseType: 'json'
        })
            .then(function (response) {
                if (response.data === null) {
                    actuallyThis.setState({
                        error: "username does not exist"
                    })
                } else {
                    bcrypt.compare(actuallyThis.state.password, response.data.password)
                        .then(function (result) {
                            if (result === true) {
                                sessionStorage.setItem("username", actuallyThis.state.username);
                                actuallyThis.props.loginHandler();
                            } else {
                                actuallyThis.setState({
                                    error: "incorrect password"
                                })
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
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
        const saltRounds = 10;


        bcrypt.genSalt(saltRounds)
            .then(function (salt) {
                bcrypt.hash(actuallyThis.state.password, salt)
                    .then(function (hash) {
                        axios({
                            method: 'post',
                            url: "http://35.189.92.93:8080/shopping-list/rest/account/create",
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
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
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
                        <input type="text" className="validate" name="username" required pattern="[A-Za-z0-9-]+" onChange={this.handleChange}></input>
                        <label className="helper-text" data-error="username can only contain letters or numbers"></label>
                    </div>
                    <div className="col s4"></div>
                </div>
                <div className="row">
                    <div className="col s4"></div>
                    <div className="col s4">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="validate" name="password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}" onChange={this.handleChange}></input>
                        <label className="helper-text" data-error="password must be between 8 and 16 characters and contain a lower and upper case letter and a number"></label>
                    </div>
                    <div className="col s4"></div>
                </div>
                <div className="row">
                    <div className="col s4"></div>
                    <div className="col center">
                        <button className="btn grey darken-2" id="login" type="submit" onClick={this.logIn}>Log In</button>
                    </div>
                    <div className="col center">
                        <button className="btn grey darken-2" id="create" type="submit" onClick={this.createUser}>Create Account</button>
                    </div>
                    <div className="col s4"></div>
                </div>
            </div>
        );
    }
}

export default LoginPage;