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

    saveChange = (e) => {
        e.preventDefault();

        let actuallyThis = this;
        
        axios({
            method: 'put',
            url: "/rest/ingredient/update/" + this.props.ingredient.ingredientID,
            responseType: 'json',
            data: {
                username: sessionStorage.getItem("username"),
                ingredientName: actuallyThis.state.ingredientName,
                amount: actuallyThis.state.amount,
                measurement: actuallyThis.state.measurement
            }
        })
        .then(function () {
            actuallyThis.setState({
                edited: false
            });
            actuallyThis.props.onUpdate();
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    deleteItem = (e) => {
        e.preventDefault();

        let actuallyThis = this;

        axios({
            method: 'delete',
            url: "/rest/ingredient/remove/" + this.props.ingredient.ingredientID,
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
                    <input value={this.state.ingredientName} type="text" className="validate" required name="ingredientName" onChange={this.handleChange} ></input>
                </div>
                <div className="input-field col s2">
                    <input value={this.state.amount} type="text" className="validate" required pattern="[0-9]+" name="amount" onChange={this.handleChange} ></input>
                </div>
                <div className="input-field col s2">
                    <input value={this.state.measurement} type="text" className="validate" name="measurement" onChange={this.handleChange} ></input>
                </div>
                <div className="col s1 right">
                    {this.state.edited ?
                        <button className="btn grey darken-2 list-button" type="submit" onClick={this.saveChange} >Save</button> :
                        <button className="btn grey darken-2 list-button" type="butsubmitton" onClick={this.deleteItem} >Delete</button> }
                </div>
            </div>
        );
    }
}

export default Ingredient;