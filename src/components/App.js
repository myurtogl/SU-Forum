import React, { Component, useEffect, useState } from "react"
import "./App.css"
import Web3 from "web3"
import Navbar from "./Navbar"
import lrs from "lrs"

const privateKeyToPublicKey = require("ethereum-private-key-to-public-key")

const App = () => {
  const [account, setAccount] = useState("")
  const [ring, setRing] = useState([])
  const [publicKey, setPublicKey] = useState("")
  const [privateKey, setPrivateKey] = useState("")

  useEffect(() => {
    loadWeb3()
    loadAccountData()
    createRing()
    // let newRing = ring.push(account)
  }, [])

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      )
    }
  }

  const loadAccountData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
  }

  const createRing = async () => {
    let newRing = []
    for (let i = 0; i < 10; i++) {
      newRing.push(lrs.gen())
    }
    await setRing(newRing)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(ring)
    console.log(privateKeyToPublicKey(ring[0].privateKey).toString("hex"))
    console.log(`Private Key: ${privateKey}`)
    console.log(`Public Key: ${publicKey}`)
  }

  return (
    <>
      <div>
        <Navbar account={account} />
      </div>

      <div style={{ marginTop: "100px", marginLeft: "20px" }}>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your private key:
            <input
              type="text"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
          </label>
          <label>
            Enter your public key:
            <input
              type="text"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    </>
  )
}

export default App
