import React from "react"

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
          </button>{" "}
        </>
      ) : (
        <>
          <label>
            Address to Add:
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </label>
          <button type="button" onClick={addMember}>
            Add New Member
          </button>
        </>
      )}
    </form>
  )
}

export default AddForm
