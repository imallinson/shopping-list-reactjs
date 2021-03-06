import React, { Component } from 'react';
import axios from 'axios';

class Ingredient extends Component {
    constructor() {
        super();
        this.state = {
            edited: false,
            ingredientName: "",
            amount: "",
            measurement: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            edited: true
        })
    }

    addIngredient = (e) => {
        e.preventDefault();

        let actuallyThis = this;

        axios({
            method: 'post',
            url: "/rest/ingredient/add",
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
                    edited: false,
                    ingredientName: "",
                    amount: "",
                    measurement: ""
                });
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
                    <input placeholder="ingredient" type="text" className="validate" name="ingredientName" required value={this.state.ingredientName} onChange={this.handleChange} ></input>
                </div>
                <div className="input-field col s2">
                    <input placeholder="amount" type="text" className="validate" name="amount" required pattern="[0-9]+" value={this.state.amount} onChange={this.handleChange} ></input>
                </div>
                <div className="input-field col s2">
                    <input placeholder="measurement" type="text" className="validate" name="measurement" value={this.state.measurement} onChange={this.handleChange} ></input>
                </div>
                <div className="col s1 right">
                    {this.state.edited ?
                        <button className="btn grey darken-2 list-button" type="submit" onClick={this.addIngredient} >Save</button> :
                        null}
                </div>
            </div>
        );
    }
}

export default Ingredient;