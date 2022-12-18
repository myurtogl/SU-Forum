import React, { Component, useEffect, useState } from 'react'
import './App.css'
import Web3 from 'web3'
import Navbar from './Navbar'
import lrs from 'lrs'

const App = () => {
  const [account, setAccount] = useState('')
  const [ring, setRing] = useState([])

  useEffect(() => {
    loadWeb3()
    loadAccountData()
    createRing()
    let newRing = ring.push(account)
  }, [])

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }
  }

  const loadAccountData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    setAccount(accounts[0])
  }

  const createRing = () => {
    for (let i = 0; i < 10; i++) {
      let newRing = ring.push(lrs.gen().publicKey)
      setRing(newRing)
    }
    console.log(ring)
  }

  const createSignature = () => {
    return
  }

  return (
    <>
      <div>
        <Navbar account={account} />
      </div>

      <div style={{ 'margin-top': '100px', 'margin-left': '20px' }}>
        <button onClick={createSignature}> Press </button>
      </div>
    </>
  )
}

export default App
