import React, { Component } from "react"
import "./App.css"
import generator from 'sudoku'
import SudokuBoard from "./components/SudokuBoard";

window.generator = generator;

/*
Generates a sudoku with the structure
{rows: 
  [ 
    {
      index: 0, 
      cols: [{row:0, col:0, value:1, readonly:true}, ...]
    }, 
    ...
  ]
}
*/
function generateSudoku() {
  const raw = generator.makepuzzle()
  console.log(raw)
  const result = {rows: []}

  for (let i=0; i<9; i++) {
    const row = { index: i, cols: [] }
    for (let j=0; j<9; j++) {
      let value = raw[i*9+j]
      // Change null to undefined to fix error message
      value = value === null ? undefined : value
      const col = {
        row: i,
        col: j,
        value: value,
        readonly: value !== undefined
      }
      row.cols.push(col)
    }
    result.rows.push(row)
  }

  return result;
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sudoku: generateSudoku()
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p> Sudoku
          </p>
        </header>
        <SudokuBoard sudoku={this.state.sudoku} />
      </div>
    )
  }
}

export default App
