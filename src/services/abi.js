const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_content",
        type: "string",
      },
    ],
    name: "addTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllTweets",
    outputs: [
      {
        internalType: "tuple[]",
        type: "tuple[]",
        name: "_tweet",
        components: [
          { internalType: "address", type: "address", name: "_author" },
          { internalType: "uint256", type: "uint256", name: "_id" },
          { internalType: "string", type: "string", name: "_content" },
          { internalType: "uint256", type: "uint256", name: "_timestamp" },
        ],
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tweetid",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_content",
        type: "string",
      },
    ],
    name: "updateTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tweetid",
        type: "uint256",
      },
    ],
    name: "deleteTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default abi;
