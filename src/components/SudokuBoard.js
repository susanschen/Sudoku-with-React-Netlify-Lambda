import React, { Component } from 'react'
import SodukuField from './SudokuField';
import Timer from './Timer';
import Result from './Result';

export default class SudokuBoard extends Component {
  render() {
    const {sudoku, onChange} = this.props;
    return (
      <div>
        {/* Quick test to display the generated Sudoku
         {JSON.stringify(this.props.sudoku)} 
        */}
        { sudoku.solvedTime ? <Result sudoku={sudoku} /> 
          : <Timer start={sudoku.startTime} /> 
        }

        {sudoku.rows.map(row => (
          <div className="row" key={row.index}>
            {row.cols.map(field => (
              <SodukuField field={field} key={field.col} onChange={onChange} />              
            ))}              
          </div>
        ))}
      </div>
    )
  }
}