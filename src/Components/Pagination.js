import React, { Component } from 'react';
import PropTypes from 'prop-types';



export default class Pagination extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            currentPage:1,
            total:null,
            from:null,
            to:null,
            pages:[],
            perPage:this.props.perPage
        }
    }
    componentDidMount(){
        if(this.props.items && this.props.items.length){
            console.log("From componentDidMount ", this.props.items);
            this.setPagination(this.props.currentPage);
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.items !== prevProps.items){
            console.log("From componentDidUpdate ", this.props.items);
            this.setPagination(this.props.currentPage);
        }
    }
    /**
     * Set the pagination 
     * @param {*} currentPage 
     */
    setPagination(currentPage){
        console.log("setPagination called...");
        //Array of items per page
        let arrayOfItems = [];
        //total pages
        const total = Math.ceil(this.props.items.length / this.props.perPage);
        console.log("Total pages: ", total);
        //start index to slice items
        let from = (currentPage - 1) * this.props.perPage;
        console.log("startIndex: ", from);
        //end index to slice Items
        let to = from + this.props.perPage - 1;
        console.log("endIndex: ",to);
        //Create array of item per page by slicing in items array
        arrayOfItems = this.props.items.slice(from,to + 1);
        console.log("Array of items : " , arrayOfItems);
        //create an array of number of pages to loop in the render method
        let pages = [];
        for(let i = 1; i <= total; i++){
            pages[i] = i;
        }
        //update state
        this.setState({
            currentPage:currentPage,
            total:total,
            from:from,
            to:to,
            pages:pages
        });
        //pass array of items per page to the parent component
        this.props.handlePage(arrayOfItems);
    }

    render() {
        return (
            <div>
                {this.state.pages.map((item,i)=>{
                    return (
                        <span onClick={() => this.setPagination(i)} key={i}>{item}</span>
                    )
                })}
            </div>
        )
    }
}
/**
 * Pagination defaultProps
 */
Pagination.defaultProps = {
    currentPage:1,
    perPage:5
};

Pagination.propTypes = {
    items: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
    perPage: PropTypes.number
};

