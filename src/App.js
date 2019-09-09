import React, { Component } from "react"
import "./App.css"
import generator from "sudoku"
import produce from "immer"
import SudokuBoard from "./components/SudokuBoard";

window.generator = generator;

/*
Returns an object with its initial sudoku state and solution
{rows:  // 9 rows
  [ 
    {
      index: 0-8,  // row index
      cols: [{row:0-8, col:0-8, value:1-9, readonly:boolean}, ...]  // 9 columns
    }, 
    ...
  ]
}
*/
function generateSudoku() {
  // Generate the puzzle and return an array of 81 values
  const raw = generator.makepuzzle()
  const rawSolution = generator.solvepuzzle(raw)

  // The generated puzzle values are from 0-8, add one to convert it to 1-9
  const formattedRaw = raw.map(value => value === null ? "" : value+1)
  const formattedSolution = rawSolution.map(value => value+1)
  
  // Build an object from the array
  const result = { 
    rows: [], 
    solution: formattedSolution
  }
  // Convert the flat array to a 2d array
  for (let i=0; i<9; i++) {
    const row = { index: i, cols: [] }
    for (let j=0; j<9; j++) {
      let value = formattedRaw[i*9+j]

      const cell = {
        row: i,
        col: j,
        value: value,
        readonly: value !== ""
      }
      row.cols.push(cell)
    }
    result.rows.push(row)
  }

  // Return the generated puzzle and its solution
  return result;
}

class App extends Component {
  constructor(props) {
    super(props)

    /*
    npm package immer
      The basic idea is that you will apply all your changes to a temporary draftState, which is a proxy of the currentState. Once all your mutations are completed, Immer will produce the nextState based on the mutations to the draft state. 
    https://www.npmjs.com/package/immer

    const nextState = produce(currentState, draft => {})

    The produce function takes two arguments:
    1. the current state
    2. the producer function, which receives one argument, the draft, which is a proxy to the current state you passed in. Any modification you make to the draft will be recorded and used to produce nextState. 

    https://medium.com/hackernoon/introducing-immer-immutability-the-easy-way-9d73d8f71cb3
    */

    // same as:  this.state = {sudoku: generateSudoku()}
    this.state = produce({}, () => (
       { sudoku: generateSudoku() }
      )
    )
  }

  handleChange = e => {
    this.setState(
      // Here is the benefit of using produce():
      //  Only edit the one field (sudoku square) that the user clicked on
      //  instead of updating the entire sudoku object with a nested for-loop
      // produce() returns the updated sudoku object
      produce(state => {
        state.sudoku.rows[e.row].cols[e.col].value = e.value
      })
    )
  }

  getSolution = e => {
    this.setState(
      produce(state=> {
        state.sudoku.rows.forEach(row => row.cols.forEach(col => {
          // For each value that is not a readonly, get the solution
          if(!col.readonly) {
            col.value = state.sudoku.solution[ col.row * 9 + col.col]
          }
        }))
      })
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p> Sudoku
          </p>
        </header>
        <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange}/>
        <button onClick={this.getSolution}>Show Solution</button>
      </div>
    )
  }
}

export default App
