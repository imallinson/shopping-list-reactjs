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

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            edited: true,
            [name]: value
        })
    }

    addIngredient = () => {
        if (this.state.ingredientName === null) {
            this.setState({
                ingredientName: " "
            })
        }

        if (this.state.amount === null || this.state.amount < 0 || isNaN(this.state.amount)) {
            this.setState({
                amount: 0
            })
        }

        if (this.state.measurement === null) {
            this.setState({
                measurement: " "
            })
        }
        
        let actuallyThis = this;

        axios({
            method: 'post',
            url: 'http://localhost:8081/shopping-list/rest/ingredient/add',
            responseType: 'json',
            data: {
                username: sessionStorage.getItem("username"),
                ingredientName: actuallyThis.state.ingredientName,
                amount: actuallyThis.state.amount,
                measurement: actuallyThis.state.measurement
            }
        })
        .then(function () {
            actuallyThis.props.onUpdate();
            actuallyThis.setState({
                edited: false,
                ingredientName: "",
                amount: "",
                measurement: "" 
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="row">
                <div className="input-field col s7">
                    <input placeholder="ingredient" type="text" name="ingredientName" value={this.state.ingredientName} onChange={this.handleChange} ></input>
                </div>
                <div className="input-field col s2">
                    <input placeholder="amount" type="text" name="amount" value={this.state.amount} onChange={this.handleChange} ></input>
                </div>
                <div className="input-field col s2">
                    <input placeholder="measurement" type="text" name="measurement" value={this.state.measurement} onChange={this.handleChange} ></input>
                </div>
                <div className="col s1 right">
                    {this.state.edited ?
                        <button className="btn grey darken-2 list-button" onClick={this.addIngredient} >Save</button> :
                        null }
                </div>
            </div>
        );
    }
}

export default Ingredient;