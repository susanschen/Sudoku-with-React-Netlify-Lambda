import React, { Component } from 'react'

export default class SodukuField extends Component {
  handleChange = e=> {
    // Convert string to number
    const value = parseInt(e.target.value, 10)
    // Only accept number less than 10 as inputs
    if(!isNaN(value)) {
      if(value<10) {
        this.props.onChange({...this.props.field, value: e.target.value})
      }
    }

  }

  render() {
    const {field} = this.props;
    return (
      <input 
        className="field" 
        value={field.value} 
        readOnly={field.readonly}
        onChange={this.handleChange}
      />
    )
   
  }
}