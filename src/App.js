import React, { Component } from "react"
import "./App.css"
import produce from "immer"
import {generateSudoku, checkSolution} from "./lib/sudoku"
import SudokuBoard from "./components/SudokuBoard";

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
      // note: if user enters the same number, then there is no update to state
      produce(state => {
        // update state to new input value. (convert string to number)
        state.sudoku.rows[e.row].cols[e.col].value = parseInt(e.value,10)

        // Did user solve the puzzle?
        if ( !state.sudoku.solvedTime ) {
          const solved = checkSolution(state.sudoku)  
          if (solved)
            state.sudoku.solvedTime = new Date();          
        }
      })
    )
  }

  getSolution = e => {
    this.setState(
      produce(state=> {
        state.sudoku.rows.forEach(row => row.cols.forEach(col => {
          col.value = state.sudoku.solution[ col.row * 9 + col.col]
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
