import React, { Component } from 'react'

export default class SodukuField extends Component {
  handleChange = e=> {   
    const value = e.target.value

     // Only accept number less than 10 as inputs
    if(!isNaN(value) && value<10) {
        this.props.onChange({...this.props.field, value: value})
    }
  }

  render() {
    const {field} = this.props;
    return (
      <input 
        className={field.col%3===0 ? "third-column field" : "field"}
        value={field.value} 
        readOnly={field.readonly}
        onChange={this.handleChange}
      />
    )
   
  }
}