import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import UniversityForum from '../abis/UniversityForum.json'
import AddForm from './AddForm'
import Navbar from './Navbar'
import Messages from './Messages'

const App = () => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [forum, setForum] = useState(null)
  const [account, setAccount] = useState(null)
  const [messageCount, setMessageCount] = useState(0)
  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadWeb3 = async () => {
    setLoading(true)
    console.log('in loadWeb3')
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
    console.log('end of loadWeb3')
  }

  const fetchMessages = async () => {
    setLoading(true)
    if (forum != null) {
      const messageNum = await forum.methods.messageCount().call()
      setMessageCount(messageNum)
      let messageList = []
      for (let i = 0; i < messageNum; i++) {
        const message = await forum.methods.messages(i).call()
        messageList.push(message)
      }
      if (messageList.length === 0) console.log('no messages yet')
      setMessages(messageList)
    }
    setLoading(false)
  }

  const loadBlockchainData = async () => {
    setLoading(true)
    console.log('in loadBlockChainData')
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData = UniversityForum.networks[networkId]
    if (networkData) {
      const forumInstance = await web3.eth.Contract(
        UniversityForum.abi,
        networkData.address,
      )
      setForum(forumInstance)
      await console.log(forumInstance)
      // fetch messages
      await console.log(forumInstance.methods)
      const messageNum = await forumInstance.methods.messageCount().call()
      setMessageCount(messageNum)
      let messageList = []
      for (let i = 0; i < messageNum; i++) {
        const message = await forumInstance.methods.messages(i).call()
        messageList.push(message)
      }
      setMessages(messageList)
    } else {
      window.alert('Forum contract not deployed to detected network.')
    }
    console.log('end of loadblockchaindata')
    setLoading(false)
  }

  const checkIfOwner = async () => {
    setLoading(true)
    if (forum != null) {
      console.log(forum)
      const ownerAddress = await forum.methods.owner().call()
      console.log(ownerAddress)
      console.log(ownerAddress === account)
      setIsOwner(ownerAddress === account)
    }
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      await loadWeb3()
      await loadBlockchainData()
    })()
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [forum])

  useEffect(() => {
    checkIfOwner()
  }, [forum])

  const addMessage = async () => {
    if (inputValue) {
      await forum.methods.addMessage('Test Type', inputValue).send({
        from: account,
      })

      console.log('buradayız')

      forum.on('NewMessage', (index, sender, time, type, content) => {
        console.log(index, sender, time, type, content)
      })
      // setInputValue('')

      // let newMessage = await forum.methods.messages(messageCount).call()
      // let newMessages = [...messages, newMessage]
      // setMessages(newMessages)
    }
  }

  const addMember = async () => {
    if (inputValue) {
      await forum.methods.setMembership(inputValue, true).send({
        from: account,
      })

      setInputValue('')
    }
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
        </div>
      )}
    </>
  )
}

export default App
