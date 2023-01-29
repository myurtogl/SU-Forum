// // const PythonShell = require('python-shell').PythonShell

// // async function hello(name) {
// //   let result = null
// //   const response = await PythonShell.run(
// //     './src/components/hello.py',
// //     { args: [name] },
// //     async (err, results) => {
// //       if (err) throw err
// //       // Results is an array consisting of messages collected during execution
// //       //   console.log(results)
// //       result = results[0]
// //     },
// //   )

// //   if (result.t) return result
// // }

// // async function hello2(name) {
// //   let shell = new PythonShell('./src/components/hello.py', { mode: 'json' })

// //   // handle message (a line of text from stdout, parsed as JSON)

// //   shell.stdout.on('data', (data) => {
// //     console.log(data)
// //   }),
// //     shell.send('tan').send('tuna').end()
// // }

// // const spawn = require('child_process').spawn

// // async function hello3(name) {
// //   const pythonProcess = await spawn('python', [
// //     './src/components/hello.py',
// //     name,
// //   ])
// //   let result = null
// //   pythonProcess.stdout.on('data', (data) => {
// //     console.log(Buffer.from(data).toString())
// //     result = Buffer.from(data).toString()
// //   })

// //   if (result) return result
// // }
// // // console.log(hello3('tan'))
// // // hello3('tan')

const { spawn } = require('child_process')

export async function hello4(name) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['./src/components/hello.py', name])
    let result = null
    pythonProcess.stdout.on('data', (data) => {
      //   console.log(Buffer.from(data).toString())
      result = Buffer.from(data).toString()
      resolve(result)
    })
  })
}

const { PythonShell } = require('python-shell')

export function hello(name) {
  return new Promise((resolve, reject) => {
    const pythonProcess = PythonShell.run(
      '/SU-Forum/src/components/hello.py',
      { args: [name] },
      function (err, results) {
        if (err) throw err
      },
    )
    pythonProcess.stdout.on('data', (data) => {
      resolve(data)
    })
    pythonProcess.stdout.on('error', (err) => {
      reject(err)
    })
  })
}

hello('John').then((result) => {
  console.log(result)
})

// hello4('John').then((result) => {
//   console.log(result)
// })
