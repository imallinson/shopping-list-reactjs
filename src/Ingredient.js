import React, { Component } from 'react';
import axios from 'axios';
import MaterialIcon, {colorPalette} from 'material-icons-react';

class Ingredient extends Component {
    constructor() {
        super();
        this.state = {
            checked: false,
            edited: false,
            ingredientName: null,
            measurement: null,
            amount: null,
        }
    }

    componentWillReceiveProps = () => {
        this.setState({
            ingredientName: this.props.ingredient.ingredientName,
            amount: this.props.ingredient.amount,
            measurement: this.props.ingredient.measurement
        })
    }

    markChecked = () => {
        this.setState({
            checked: !this.state.checked
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
            actuallyThis.props.onUpdate();
            actuallyThis.setState({
                edited: false,
                ingredientName: actuallyThis.state.ingredientName,
                amount: actuallyThis.state.amount,
                measurement: actuallyThis.state.measurement 
            })
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