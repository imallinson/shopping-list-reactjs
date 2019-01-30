import React, { Component } from 'react';
import axios from 'axios';
import Ingredient from './Ingredient.js';
import NewIngredient from './NewIngredient.js';

class ShoppingList extends Component {
    constructor() {
        super();
        this.state = {
            shoppingList: []
        }
    }

    componentWillMount = () => {
        this.getIngredientList();
    }

    componentWillUpdate = () => {
        this.getIngredientList();
    }

    getIngredientList = () => {
        let actuallyThis = this;
        axios({
            method: 'get',
            url: "http://localhost:8081/shopping-list/rest/ingredient/get/" + this.props.username,
            responseType: 'json'
        })
        .then(function (response) {
            actuallyThis.setState({
                shoppingList: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    clearList = () => {
        let actuallyThis = this;
        axios({
            method: 'delete',
            url: "http://localhost:8081/shopping-list/rest/account/clear/" + this.props.username,
            responseType: 'json'
        })
        .then(function (response) {
            actuallyThis.setState({
                shoppingList: []
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    handleUpdate = () => {
        this.forceUpdate();
    }

    render() {
        const listComponents = this.state.shoppingList.map((i) => <div className="row" id={i} ><Ingredient ingredient={i} onUpdate={this.handleUpdate} username={this.props.username} /></div>);

        return(
            <div className="container" id="listPage" >
                <div className="row">
                    <div className="col s4"></div>
                    <div className="col s4 center">
                        <button className="btn grey darken-2" onClick={this.clearList} >Clear Shopping List</button>
                    </div>
                    <div className="col s4"></div>
                </div>
                {listComponents}
                <NewIngredient onUpdate={this.handleUpdate} username={this.props.username} />
            </div>
        );       
    }
}

export default ShoppingList;