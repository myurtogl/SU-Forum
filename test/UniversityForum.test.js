const UniversityForum = artifacts.require('UniversityForum')

contract('UniversityForum', (accounts) => {
  let instance

  before(async () => {
    instance = await UniversityForum.deployed()

    // Set membership for the first account
    await instance.setMembership(accounts[0], true, {
      from: accounts[0],
      gas: 2000000,
    })

    // Set membership for the second account
    await instance.setMembership(accounts[1], true, {
      from: accounts[0],
      gas: 2000000,
    })
  })

  it('should verify membership correctly', async () => {
    // Check membership for the first account
    await instance
      .verifyMembership(accounts[0], { from: accounts[0] })
      .then(async (result) => {
        assert.isTrue(result, 'Membership was not verified correctly')
      })

    // Check membership for the second account
    await instance
      .verifyMembership(accounts[1], { from: accounts[1] })
      .then(async (result) => {
        assert.isTrue(result, 'Membership was not verified correctly')
      })

    // Check membership for an unregistered account
    await instance
      .verifyMembership(accounts[2], { from: accounts[2] })
      .then(async (result) => {
        assert.isFalse(result, 'Membership was not verified correctly')
      })
  })

  it('should add messages correctly', async () => {
    const messageType = 'Test Type'
    const content = 'Test Content'

    // Add a message from the first account
    await instance
      .addMessage(messageType, content, { from: accounts[0] })
      .then(async () => {
        // Check that the message was added correctly
        await instance.messages.call(0).then(async (result) => {
          assert.equal(result[0], accounts[0], 'Incorrect author for message')
          assert.equal(result[2], messageType, 'Incorrect type for message')
          assert.equal(result[3], content, 'Incorrect content for message')
        })
      })
  })
})
