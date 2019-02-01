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

    saveChange = () => {
        let actuallyThis = this;
        let ingredientName;
        let amount;
        let measurement;

        if (this.state.ingredientName === null) {
            ingredientName = this.props.ingredient.ingredientName
        } else {
            ingredientName = this.state.ingredientName
        }

        if (this.state.amount === null) {
            amount = this.props.ingredient.amount
        } else {
            amount = this.state.amount
        }

        if (this.state.measurement === null) {
            measurement = this.props.ingredient.measurement
        } else {
            measurement = this.state.measurement
        }

        axios({
            method: 'put',
            url: "http://localhost:8081/shopping-list/rest/ingredient/update/" + this.props.ingredient.ingredientID,
            responseType: 'json',
            data: {
                username: sessionStorage.getItem("username"),
                ingredientName: ingredientName,
                amount: amount,
                measurement: measurement
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

    handleNameChange = (e) => {
        this.setState({
            ingredientName: e.target.value
        })
    }

    handleAmountChange = (e) => {
        this.setState({
            amount: e.target.value
        })
    }

    handleMeasurementChange = (e) => {
        this.setState({
            measurement: e.target.value
        })
    }

    render() {
        return (
            <div className="row">
                <div className="input-field col s7">
                    <input defaultValue={this.state.ingredientName} type="text" name="ingredientName" onChange={this.handleNameChange} ></input>
                </div>
                <div className="input-field col s2">
                    <input defaultValue={this.state.amount} type="text" name="amount" onChange={this.handleAmountChange} ></input>
                </div>
                <div className="input-field col s2">
                    <input defaultValue={this.state.measurement} type="text" name="measurement" onChange={this.handleMeasurementChange} ></input>
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