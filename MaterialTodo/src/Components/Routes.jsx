import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Todo from "./Todo";
import Details from "./Details";

export class Routes extends Component {
    render() {
        return (
            <div> 
                <Route path="/" exact component={Todo}/>   
                <Route path="/details/:id" exact component={Details} />           
            </div>
        )
    }
}

export default Routes;