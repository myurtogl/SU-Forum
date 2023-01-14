import React, { useState } from 'react'

const Register = ({ loading, register }) => {
  const [privateKey, setPrivateKey] = useState('')
  const [userAddress, setUserAddress] = useState('')

  if (loading) return null
  return (
    <div style={{ margin: '20px' }}>
      <form>
        <>
          <label>
            Private Key:
            <input
              type="text"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
          </label>

          <label>
            User Address:
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
          </label>

          <button
            type="button"
            onClick={() => {
              register(privateKey, userAddress)
              setPrivateKey('')
              setUserAddress('')
            }}
          >
            Register
          </button>
        </>
      </form>
    </div>
  )
}

export default Register
