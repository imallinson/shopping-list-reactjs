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

    componentWillReceiveProps = () => {
        let ingredientName;
        let amount;
        let measurement;

        if (this.props.ingredient.ingredientName) {
            ingredientName = this.props.ingredient.ingredientName
        } else {
            ingredientName = " "
        }

        if (this.props.ingredient.amount) {
            amount = this.props.ingredient.amount
        } else {
            amount = 0
        }

        if (this.props.ingredient.measurement) {
            measurement = this.props.ingredient.measurement
        } else {
            measurement = " "
        }

        this.setState({
            ingredientName: ingredientName,
            amount: amount,
            measurement: measurement
        })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            edited: true,
            [name]: value
        })
    }

    saveChange = () => {
        let actuallyThis = this;
        axios({
            method: 'put',
            url: "http://localhost:8081/shopping-list/rest/ingredient/update/" + this.props.ingredient.ingredientID,
            responseType: 'json',
            data: {
                username: this.props.username,
                ingredientName: this.state.ingredientName,
                amount: this.state.amount,
                measurement: this.state.measurement
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
            url: "http://localhost:8081/shopping-list/rest/ingredient/remove/" + this.props.ingredient.ingredientID,
            responseType: 'json'
        })
        .then(function () {
            actuallyThis.props.onUpdate();
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="row">
                <div className="input-field col s7">
                    <input defaultValue={this.props.ingredient.ingredientName} type="text" name="ingredientName" onChange={this.handleChange} ></input>
                </div>
                <div className="input-field col s2">
                    <input defaultValue={this.props.ingredient.amount} type="text" name="amount" onChange={this.handleChange} ></input>
                </div>
                <div className="input-field col s2">
                    <input defaultValue={this.props.ingredient.measurement} type="text" name="measurement" onChange={this.handleChange} ></input>
                </div>
                <div className="col s1">
                    {this.state.edited ?
                        <button className="btn grey darken-2 list-button" onClick={this.saveChange} >Save</button> :
                        <button className="btn grey darken-2 list-button" onClick={this.deleteItem} >Delete</button> }
                </div>
            </div>
        );
    }
}

export default Ingredient;