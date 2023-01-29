import React, { useEffect, useState } from 'react'
import script from './hello.py'
import './App.css'
import { loadPyodide } from 'pyodide'

const runScript = async (code) => {
  const pyodide = loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.22.0/full/pyodide.js',
  })

  return await pyodide.runPythonAsync(code)
}

const Pyodide = () => {
  const [output, setOutput] = useState('(loading...)')

  useEffect(() => {
    const run = async () => {
      const scriptText = await (await fetch(script)).text()
      const out = await runScript(scriptText)
      setOutput(out)
    }
    run()
  }, [])

  return (
    <div>
      <header>
        <p>5 + 7 = {output}</p>
      </header>
    </div>
  )
}

export default Pyodide
