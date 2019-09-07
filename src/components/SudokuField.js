import React, { Component } from 'react'

export default class SodukuField extends Component {
  render() {
    const {field} = this.props;
    return <input className="field" value={field.value} readOnly={field.readonly} />
  }
}