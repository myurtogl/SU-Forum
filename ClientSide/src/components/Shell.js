// import React, { useState } from 'react'
// // import PythonShell from 'python-shell'
// import { hello4 } from './pythonCall'
// import { hello } from './pythonCall'

// const Shell = () => {
//   const [result, setResult] = useState(null)
//   const runPy = () => {
//     // await PythonShell.run('hello.py', { args: ['1'] }, function (err, results) {
//     //   if (err) throw err
//     //   // Results is an array consisting of messages collected during execution
//     //   setResult(results[0])
//     // })
//     // hello4('tannn').then((result) => {
//     //   console.log(result)
//     //   setResult(result)
//     // })

//     hello('John')
//       .then((result) => {
//         console.log(result)
//       })
//       .catch((err) => {
//         console.error(err)
//       })
//   }

//   return (
//     <>
//       <div>hello</div>
//       <button onClick={runPy}> click </button>
//       <div> {result ? result : null} </div>
//     </>
//   )
// }

// export default Shell
