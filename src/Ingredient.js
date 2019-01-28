import React, { Component } from 'react';
import axios from 'axios';

class Ingredient extends Component {
    render() {
        return (
            <div className="col">
                {this.props.ingredient.ingredientName}
            </div>
        );
    }
}

export default Ingredient;