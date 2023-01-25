// pragma solidity ^0.5.0;

// contract UniversityForum {
//     // Struct to represent a message
//     struct Message {
//         uint256 index;
//         address author;
//         uint256 timestamp;
//         string messageType;
//         string content;
//     }

//     // Struct to represent a comment
//     struct Comment {
//         uint256 referenceIdx;
//         address author;
//         uint256 timestamp;
//         string content;
//     }

//     // Mapping from user address to their membership status
//     mapping(address => bool) public members;

//     uint256 public messageCount;
//     uint256 public commentCount;

//     // Array to hold all messages
//     Message[] public messages;

//     // Array to hold all comments
//     Message[] public comments;

//     // Event to emit when membership is verified
//     event MembershipVerified(bool membership);

//     // Event to emit when a new message is added
//     event NewMessage(
//         uint256 index,
//         address author,
//         uint256 timestamp,
//         string messageType,
//         string content
//     );

//     // Event to emit when a new message is added
//     event NewComment(
//         uint256 referenceIdx,
//         address author,
//         uint256 timestamp,
//         string content
//     );

//     // Address of the contract owner
//     address public owner;

//     // Constructor to set the contract owner
//     constructor() public {
//         owner = msg.sender;
//         messageCount = 0;
//     }

//     function verifyMembership(address user) public view returns (bool) {
//         // Return membership status
//         return members[user];
//     }

//     // Function to set the membership status of a given user
//     function setMembership(address user, bool membership) public {
//         // Only the contract owner can set membership status
//         require(
//             msg.sender == owner,
//             "Only the contract owner can set membership"
//         );

//         // Set the membership status
//         members[user] = membership;
//     }

//     // Function to add a new message
//     function addMessage(string memory messageType, string memory content)
//         public
//     {
//         require(verifyMembership(msg.sender), "Only members can post messages");
//         uint256 index;
//         if (messages.length != 0) {
//             index = messages.length;
//         }
//         else {
//             index = 0;
//         }
//         // Create a new message and add it to the array
//         Message memory newMessage = Message(
//             index,
//             msg.sender,
//             now,
//             messageType,
//             content
//         );
//         messages.push(newMessage);
//         messageCount = messageCount + 1;
        
//         // Emit event with message details
//         emit NewMessage(index, msg.sender, now, messageType, content);
//     }

//     // Function to add a new comment
//     function addComment(uint256 referenceIdx, string memory content)
//         public
//     {
//         require(verifyMembership(msg.sender), "Only members can post comments");

//         // Create a new comment and add it to the array
//         Comment memory newComment = Comment(
//             referenceIdx,
//             msg.sender,
//             now,
//             content
//         );
//         comments.push(newComment);
//         commentCount = commentCount + 1;
        
//         // Emit event with comment details
//         emit NewComment(referenceIdx, msg.sender, now, content);
//     }
// }


pragma solidity 0.5.0;

contract UniversityForum {
    // Struct to represent a message
    struct Message {
        uint256 index;
        address author;
        uint256 timestamp;
        string messageType;
        string content;
    }

    // Struct to represent a comment
    struct Comment {
        uint256 referenceIdx;
        address author;
        uint256 timestamp;
        string content;
    }

    // Mapping from user address to their membership status
    mapping(address => bool) public members;

    uint256 public messageCount;
    uint256 public commentCount;

    // Array to hold all messages
    Message[] public messages;

    // Array to hold all comments
    Comment[] public comments;

    // Event to emit when membership is verified
    event MembershipVerified(bool membership);

    // Event to emit when a new message is added
    event NewMessage(
        uint256 index,
        address author,
        uint256 timestamp,
        string messageType,
        string content
    );

    // Event to emit when a new message is added
    event NewComment(
        uint256 referenceIdx,
        address author,
        uint256 timestamp,
        string content
    );

    // Address of the contract owner
    address public owner;

    // Constructor to set the contract owner
    constructor() public {
        owner = msg.sender;
        messageCount = 0;
    }

    function verifyMembership(address user) public view returns (bool) {
        // Return membership status
        return members[user];
    }

    // Function to set the membership status of a given user
    function setMembership(address user, bool membership) public {
        // Only the contract owner can set membership status
        require(
            msg.sender == owner,
            "Only the contract owner can set membership"
        );

        // Set the membership status
        members[user] = membership;
    }

    // Function to add a new message
    function addMessage(string memory messageType, string memory content)
        public
    {
        require(verifyMembership(msg.sender), "Only members can post messages");
        uint256 index;
        if (messages.length != 0) {
            index = messages.length;
        }
        else {
            index = 0;
        }
        // Create a new message and add it to the array
        Message memory newMessage = Message(
            index,
            msg.sender,
            block.timestamp,
            messageType,
            content
        );
        messages.push(newMessage);
        messageCount = messageCount + 1;
        
        // Emit event with message details
        emit NewMessage(index, msg.sender, block.timestamp, messageType, content);
    }

    // Function to add a new comment
    function addComment(uint256 referenceIdx, string memory content)
        public
    {
        require(verifyMembership(msg.sender), "Only members can post comments");

        // Create a new comment and add it to the array
        Comment memory newComment = Comment(
            referenceIdx,
            msg.sender,
            block.timestamp,
            content
        );
        comments.push(newComment);
        commentCount = commentCount + 1;
        
        // Emit event with comment details
        emit NewComment(referenceIdx, msg.sender, block.timestamp, content);
    }
}
