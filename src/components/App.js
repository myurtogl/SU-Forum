import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import Navbar from './Navbar'
import AddForm from './AddForm'
import Messages from './Messages'
import Register from './Register'
import UniversityForum from '../abis/UniversityForum.json'
/* global BigInt */
const App = () => {
  const [account, setAccount] = useState()
  const [loading, setLoading] = useState(true)
  const [messageCount, setMessageCount] = useState(0)
  const [messages, setMessages] = useState([])
  const [isOwner, setIsOwner] = useState(false)
  const [inputValue, setInputValue] = useState('')

  // Declarations for Provider, Signer and Contract
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const ABI = UniversityForum.abi
  const contractAddress = '0xA1D2964e133987eff2FB1bBd5AB60A6e25342927'
  const contract = new ethers.Contract(contractAddress, ABI, provider)
  const contractWithSigner = contract.connect(signer)

  useEffect(() => {
    console.log(provider)
    console.log(signer)
    console.log(ABI)
    console.log(contract)
    const connectWallet = async () => {
      await provider
        .send('eth_requestAccounts', [])
        .catch((err) => console.error(err))

      const signerAddress = await signer.getAddress()
      setAccount(signerAddress)
    }
    connectWallet()
    checkIfOwner()
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    const messageNum = await contract.messageCount()
    const newMessageCount = messageNum - messageCount
    let messageList = []
    for (let i = 0; i < newMessageCount; i++) {
      const message = await contract.messages(messageCount + i)
      messageList.push(message)
    }
    setMessages((lst) => lst.concat(messageList))
    setMessageCount(messageNum)
    setLoading(false)
  }

  const checkIfOwner = async () => {
    setLoading(true)
    const address = await signer.getAddress()
    const ownerAddress = await contract.owner()
    setIsOwner(address === ownerAddress)
    setLoading(false)
  }

  const addMember = async () => {
    if (inputValue) {
      const transaction = await contractWithSigner.setMembership(
        inputValue,
        true,
      )
      await transaction.wait()
      console.log(transaction)
      setInputValue('')
    } else alert('Input Value is empty!')
  }

  const addMessage = async () => {
    if (inputValue) {
      const transaction = await contractWithSigner.addMessage(
        'test',
        inputValue,
      )
      await transaction.wait()
      console.log(transaction)
      fetchMessages()
      setInputValue('')
    } else alert('Input Value is empty!')
  }

  const register = async (privateKey, address) => {
    console.log(privateKey)
    console.log(address)
    const idx = 2

    await getSignature(
      'selam',
      '0027ba1cc197678fa3b69865535e6023152bad7f82fd012cc20a86d4948e7a4e',
      idx,
    )

    const request = {
      K_tilde:
        '[(55426341485918476906170035992944148906219761582507165538201410116487957527718, 20586083010784988057457386197792358001942361811237330056018592710920317210240)]',
      c_0:
        '4842384702496556302515187062466450023218645563105811222284652109016829861986',
      msg: 'selam',
      r: [
        '5148724026768610701799265676884737182332073160329502523277962976317487468373',
        '3803540293713155252320460933568732555970802853665299402495218706543748860674',
        '136097904434831696336672199276016954337763696944433523741885610195953560550',
        '7133227941731140806391197775520788136492488882143328714444094129798549068209',
        '5895088749754118334120528653984716427587879177996198146824245794198832162055',
      ],
    }

    getVerification(request.msg, request.c_0, request.r, request.K_tilde)
  }

  const getSignature = async (addr, pk, idx) => {
    const BASE_URL = 'http://127.0.0.1:5000'
    const privateKey = BigInt('0x' + pk)
    await axios
      .post(`${BASE_URL}/sign`, {
        msg: addr,
        pk: pk,
        idx: idx,
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getVerification = (msg, c_0, r, K_tilde) => {
    const BASE_URL = 'http://127.0.0.1:5000'
    axios
      .post(`${BASE_URL}/verify`, {
        msg: msg,
        c_0: c_0,
        r: r,
        K_tilde: K_tilde,
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      {loading ? (
        'Loading'
      ) : (
        <div>
          <div style={{ margin: '50px' }}>
            <Navbar account={account} />
          </div>
          <AddForm
            loading={loading}
            inputValue={inputValue}
            setInputValue={setInputValue}
            addMember={addMember}
            addMessage={addMessage}
            isOwner={isOwner}
          />
          <Messages loading={loading} messages={messages} />
          <Register loading={loading} register={register} />
        </div>
      )}
    </>
  )
}

export default App
