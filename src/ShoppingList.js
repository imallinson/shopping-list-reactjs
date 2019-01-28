import React, { Component } from 'react';
import axios from 'axios';
import Ingredient from './Ingredient.js';

class ShoppingList extends Component {
    constructor() {
        super();
        this.state = {
            shoppingList: []
        }
    }
    componentWillMount = () => {
        let actuallyThis = this;
        let url = "http://localhost:8081/shopping-list/rest/ingredient/get/" + this.props.username;
        axios({
            method: 'get',
            url: url,
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

    render() {
        const listComponents = this.state.shoppingList.map((i) => <div className="row"><Ingredient ingredient={i} /></div>);

        return(
            <div className="container">
                <div className="row">
                
                </div>
                {listComponents}
            </div>
        );       
    }
}

export default ShoppingList;