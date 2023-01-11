import React from 'react'

const AddForm = ({
  loading,
  isOwner,
  addMember,
  addMessage,
  setInputValue,
  inputValue,
}) => {
  if (loading) return null
  return (
    <div style={{ margin: '20px' }}>
      <form>
        <>
          <label>
            {isOwner ? 'Address to Add:' : 'New Message:'}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </label>
          {isOwner ? (
            <button type="button" onClick={addMessage}>
              Add Member
            </button>
          ) : (
            <button type="button" onClick={addMember}>
              Add Message
            </button>
          )}
        </>
      </form>
    </div>
  )
}

export default AddForm
