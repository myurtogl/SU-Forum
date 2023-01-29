import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './App.css'
import axios from 'axios'
import Popup from 'reactjs-popup'
import NavigationBar from './NavigationBar'
import AddForm from './AddForm'
import Messages from './Messages'
import UniversityForum from '../abis/UniversityForum.json'
import RegisterModal from './RegisterModal'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'

/* global BigInt */
const App = () => {
  const [contract, setContract] = useState(null)
  const [contractWithSigner, setContractWithSigner] = useState(null)
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [messageCount, setMessageCount] = useState(0)
  const [messages, setMessages] = useState([])
  const [commentCount, setCommentCount] = useState(0)
  const [comments, setComments] = useState([])
  const [isOwner, setIsOwner] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [signature, setSignature] = useState({})
  const [registered, setRegistered] = useState(false)
  const [modalEnabled, setModalEnabled] = useState(false)

  // Declarations for Provider, Signer and Contract
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const ABI = UniversityForum.abi
  // const contractAddress = '0x25371D810d6c87f3Bda407c5dDB641d0C5A78858'
  // const contract = new ethers.Contract(contractAddress, ABI, provider)
  // const contractWithSigner = contract.connect(signer)

  const SIGN_URL = 'http://127.0.0.1:5000'
  const CONTRACT_URL = 'http://127.0.0.1:2000'

  // useEffect(() => {
  //   console.log(provider)
  //   console.log(signer)
  //   console.log(ABI)
  //   // console.log(contract)
  //   const connectWallet = async () => {
  //     await provider
  //       .send('eth_requestAccounts', [])
  //       .catch((err) => console.error(err))

  //     const signerAddress = await signer.getAddress()
  //     setAccount(signerAddress)
  //   }
  //   connectWallet()
  //   checkIfOwner()
  //   fetchMessages()
  // }, [])

  useEffect(() => {
    console.log(provider)
    console.log(signer)
    console.log(ABI)

    const contractSetup = async () => {
      let addr
      await axios
        .get(`${CONTRACT_URL}/contractAddress`)
        .then((response) => {
          console.log(response)
          addr = response.data.addr
        })
        .catch((error) => {
          console.error(error.toString())
        })

      const contractInstance = new ethers.Contract(addr, ABI, provider)
      const contractWithSigner = contractInstance.connect(signer)
      setContract(contractInstance)
      setContractWithSigner(contractWithSigner)
    }

    const connectWallet = async () => {
      await provider
        .send('eth_requestAccounts', [])
        .catch((err) => console.error(err))

      const signerAddress = await signer.getAddress()
      setAccount(signerAddress)
    }

    contractSetup().catch(console.error)
    connectWallet().catch(console.error)
  }, [])

  useEffect(() => {
    if (contract != null) {
      console.log(contract)
      checkIfOwner()
      fetchMessages()
      // fetchComments()
    }
  }, [contract])

  useEffect(() => {
    if (Object.keys(signature).length !== 0) {
      registerRequest(
        signature.msg,
        signature.c_0,
        signature.r,
        signature.K_tilde,
      )
    } else console.log('signature empty')
  }, [signature])

  // const fetchMessages = async () => {
  //   if (contract) {
  //     setLoading(true)
  //     const messageNum = await contract.messageCount()
  //     if (messageNum === 0) {
  //       setMessages([])
  //       setMessageCount(0)
  //     } else {
  //       const newMessageCount = messageNum - messageCount
  //       let messageList = []
  //       for (let i = 0; i < newMessageCount; i++) {
  //         const message = await contract.messages(messageCount + i)
  //         messageList.push(message)
  //       }
  //       messageList = messageList.reverse()
  //       setMessages((lst) => messageList.concat(lst))
  //       setMessageCount(messageNum)
  //       setLoading(false)
  //     }
  //   }
  // }

  const fetchMessages = async () => {
    if (contract) {
      setLoading(true)
      const messageNum = await contract.messageCount()
      if (messageNum === 0) {
        setMessages([])
        setMessageCount(0)
      } else {
        const newMessageCount = messageNum - messageCount
        let messageList = []
        for (let i = 0; i < newMessageCount; i++) {
          const message = await contract.messages(messageCount + i)
          messageList.push(message)
        }
        setMessages((lst) => messageList.concat(lst))
        setMessageCount(messageNum)
        setLoading(false)
      }
    }
  }

  const fetchComments = async () => {
    if (contract) {
      console.log('in fetchcomments')
      setLoading(true)
      const commentNum = await contract.commentCount()
      if (commentCount === 0) {
        const commentList = new Array(messageCount)
        setComments(commentList)
        setCommentCount(0)
      } else {
        const newCommentCount = commentNum - commentCount
        let commentList = comments
        for (let i = 0; i < newCommentCount; i++) {
          const comment = await contract.comments(commentCount + i)
          if (commentList[comment.referenceIdx] == null) {
            commentList[comment.referenceIdx] = [comment]
          } else commentList[comment.referenceIdx].push(comment)
        }
        setComments(commentList)
        setCommentCount(commentCount)
        setLoading(false)
      }
      console.log(comments)
    }
  }

  // const checkIfMember = async () => {
  //   setLoading(true)
  //   const address = await signer.getAddress()
  //   const isMemberResult = await contract.verifyMembership(address)
  //   setIsMember(isMemberResult)
  //   setLoading(false)
  // }

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

  const addMessage = async (type, msg) => {
    const isMemberResult = await contract.verifyMembership(account)
    if (isMemberResult) {
      const transaction = await contractWithSigner.addMessage(type, msg)
      await transaction.wait()
      console.log(transaction)
      fetchMessages()
    } else alert('You are not a member of this forum. Please, register first.')

    setInputValue('')
  }

  const addComment = async (idx, msg) => {
    console.log('in addcomment')
    const isMemberResult = await contract.verifyMembership(account)
    if (isMemberResult) {
      const transaction = await contractWithSigner.addComment(idx, msg)
      await transaction.wait()
      console.log(transaction)
      fetchComments()
    } else alert('You are not a member of this forum. Please, register first.')
  }

  const register = async (privateKey, address) => {
    console.log(privateKey)
    console.log(address)

    await getSignature(address, privateKey)
  }

  const getSignature = async (addr, pk) => {
    await axios
      .post(`${SIGN_URL}/sign`, {
        msg: addr,
        pk: pk,
      })
      .then((response) => {
        if (response.data.result == true) {
          console.log(response.data)
          const msg = response.data.msg
          const c_0 = BigInt(response.data.c_0)
          const r = response.data.r.map((str) => BigInt(str))
          const K_tilde = response.data.K_tilde
          const signature = {
            msg: msg,
            c_0: c_0,
            r: r,
            K_tilde: K_tilde,
          }
          console.log(signature)
          setSignature(signature)
        } else alert('Key you are using is not valid. Please try again.')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const registerRequest = (msg, c_0, r, K_tilde) => {
    console.log('in registerrequest')
    const r_par = r.map((num) => num.toString())
    axios
      .post(`${CONTRACT_URL}/register`, {
        msg: msg,
        c_0: c_0.toString(),
        r: r_par,
        K_tilde: K_tilde,
      })
      .then((response) => {
        console.log(response.data)
        alert(
          `You are registered to the forum successfully with the address ${account}`,
        )
      })
      .catch((error) => {
        console.error(error.toString())
      })
  }

  const getVerification = (msg, c_0, r, K_tilde) => {
    console.log('in getVerification')
    const r_par = r.map((num) => num.toString())
    axios
      .post(`${SIGN_URL}/verify`, {
        msg: msg,
        c_0: c_0.toString(),
        r: r_par,
        K_tilde: K_tilde,
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error.toString())
      })
  }

  return (
    <>
      {loading ? (
        'Loading'
      ) : (
        <div className="mainBody" style={{ backgroundColor: 'red' }}>
          <NavigationBar
            setModalEnabled={setModalEnabled}
            account={account}
            styles={{ 'margin-bottom': '50px' }}
          />
          <div class="split left main">
            <Messages loading={loading} messages={messages} />
          </div>

          <div class="split right main">
            <AddForm
              loading={loading}
              inputValue={inputValue}
              setInputValue={setInputValue}
              addMember={addMember}
              addMessage={addMessage}
              isOwner={isOwner}
            />
          </div>

          <RegisterModal
            show={modalEnabled}
            onRegister={register}
            onHide={() => setModalEnabled(false)}
            account={account}
          />
        </div>
      )}
    </>
  )
}

export default App
