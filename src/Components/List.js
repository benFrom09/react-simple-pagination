import React, { Component } from 'react';
import Pagination from './Pagination';

export default class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            items:[],
            arrayOfItems:[]
        }
        this.onPaginateItems = this.onPaginateItems.bind(this);
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            this.setState({items:json})
        })
    }
    onPaginateItems(arrayOfItems){
        this.setState({arrayOfItems:arrayOfItems})
    }
    render() {
        const {items,arrayOfItems} = this.state;
        return (
            <div>
                {arrayOfItems.map(item => {
                    return (
                        
                        <li key={item.id}>
                            hello + {item.id}
                        </li>
                        
                    );
                })}
                <Pagination items={items} handlePage={this.onPaginateItems} />
            </div>
        )
    }
}
