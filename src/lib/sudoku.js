import generator from 'sudoku'
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
export function generateSudoku() {
  // Generate the puzzle and return an array of 81 values
  const raw = generator.makepuzzle()
  const rawSolution = generator.solvepuzzle(raw)

  // The generated puzzle values are from 0-8, add one to convert it to 1-9
  const formattedRaw = raw.map(value => value === null ? "" : value+1)
  const formattedSolution = rawSolution.map(value => value+1)
  
  // Build an object from the array
  const result = { 
    rows: [], 
    solution: formattedSolution,
    startTime: new Date(),
    solvedTime: null
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
  return result
}

// Check if the user entered correct values for the cells
export function checkSolution(sudoku) {  
  // convert 2d array to flat array
  const candidate = sudoku.rows
    .map(row => row.cols.map(col => col.value))
    .flat()   
  
  for(let i=0; i<candidate.length; i++) {
    if(candidate[i] === "" || candidate[i] !== sudoku.solution[i]) return false
  } 
  return true
}