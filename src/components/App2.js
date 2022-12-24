import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import UniversityForum from '../abis/UniversityForum.json'

const App2 = () => {
  // State variables to hold the forum messages and input value
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [forum, setForum] = useState(null)
  const [account, setAccount] = useState(null)
  const [messageCount, setMessageCount] = useState(0)
  const [events, setEvents] = useState([])
  const [newAdress, setNewAddress] = useState('')
  const [isOwner, setIsOwner] = useState(false)

  const loadWeb3 = async () => {
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
    console.log(forum)
    if (forum != null) {
      const messageNum = await forum.methods.messageCount().call()
      setMessageCount(messageNum)
      let messageList = []
      for (let i = 0; i < messageNum; i++) {
        const message = await forum.methods.messages(i).call()
        messageList.push(message)
      }
      setMessages(messageList)
    }
  }

  const loadBlockchainData = async () => {
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

      // forumInstance.events.NewMessage((error, event) => {
      //   if (error) {
      //     console.error(error)
      //   } else {
      //     console.log(event)
      //     setEvents([...events, event])
      //   }
      // })
    } else {
      window.alert('Forum contract not deployed to detected network.')
    }
    console.log('end of loadblockchaindata')
  }

  const checkIfOwner = async () => {
    const ownerAddress = await forum.methods.owner().call()
    console.log(account)
    setIsOwner(ownerAddress === account)
  }

  // Use effect hook to fetch the messages when the component is mounted
  useEffect(() => {
    ;(async () => {
      await loadWeb3()
      await loadBlockchainData()
      console.log(forum)
      checkIfOwner()
    })()
  }, [])

  // useEffect(() => {
  //   fetchMessages()
  // }, [forum])

  // Function to add a new message to the forum
  const addMessage = async () => {
    // Check that the input value is not empty
    if (inputValue) {
      // Call the addMessage function in the contract with the input value
      const response = await forum.methods
        .addMessage('Test Type', inputValue)
        .send({
          from: account,
        })

      if (response) {
        // Clear the input value
        setInputValue('')

        // Fetch the updated list of messages
        fetchMessages()
      }
    }
  }

  const addMember = async () => {}

  // Render the forum messages and input form
  return (
    <div>
      <h1>University Forum</h1>
      <ul>
        {messages.length != 0
          ? messages.map((message) => (
              <li key={message.timestamp}>
                {message.author.toString()}: {message.content}
              </li>
            ))
          : 'no message'}
      </ul>
      <form>
        {!isOwner ? (
          <>
            <label>
              New Message:
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </label>
            <button type="button" onClick={addMessage}>
              Add Message
            </button>{' '}
          </>
        ) : (
          <>
            <label>
              Address to Add:
              <input
                type="text"
                value={newAdress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </label>
            <button type="button" onClick={addMessage}>
              Add New Member
            </button>
          </>
        )}
      </form>
    </div>
  )
}

export default App2
