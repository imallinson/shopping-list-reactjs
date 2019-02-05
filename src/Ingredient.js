import React, { Component } from 'react';
import axios from 'axios';

class Ingredient extends Component {
    constructor() {
        super();
        this.state = {
            edited: false,
            ingredientName: null,
            amount: null,
            measurement: null
        }
    }

    componentWillMount = () => {
        this.setState({
            ingredientName: this.props.ingredient.ingredientName,
            amount: this.props.ingredient.amount,
            measurement: this.props.ingredient.measurement
        })
    }

    saveChange = () => {
        let actuallyThis = this;

        let amount = actuallyThis.state.amount;
        if (isNaN(amount) || amount < 0) {
            amount = 0;
        }
        
        axios({
            method: 'put',
            url: "http://172.20.0.3/shopping-list/rest/ingredient/update/" + this.props.ingredient.ingredientID,
            responseType: 'json',
            data: {
                username: sessionStorage.getItem("username"),
                ingredientName: actuallyThis.state.ingredientName,
                amount: amount,
                measurement: actuallyThis.state.measurement
            }
        })
        .then(function () {
            actuallyThis.setState({
                edited: false
            })
            actuallyThis.props.onUpdate();
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    deleteItem = () => {
        let actuallyThis = this;
        axios({
            method: 'delete',
            url: "http://172.20.0.3/shopping-list/rest/ingredient/remove/" + this.props.ingredient.ingredientID,
            responseType: 'json'
        })
        .then(function () {
            actuallyThis.props.onUpdate();
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            edited: true
        })
    }

    render() {
        return (
            <div className="row">
                <div className="input-field col s7">
                    <input value={this.state.ingredientName} type="text" name="ingredientName" onChange={this.handleChange} ></input>
                </div>
                <div className="input-field col s2">
                    <input value={this.state.amount} type="text" name="amount" onChange={this.handleChange} ></input>
                </div>
                <div className="input-field col s2">
                    <input value={this.state.measurement} type="text" name="measurement" onChange={this.handleChange} ></input>
                </div>
                <div className="col s1 right">
                    {this.state.edited ?
                        <button className="btn grey darken-2 list-button" onClick={this.saveChange} >Save</button> :
                        <button className="btn grey darken-2 list-button" onClick={this.deleteItem} >Delete</button> }
                </div>
            </div>
        );
    }
}

export default Ingredient;