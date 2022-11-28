import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Tweet from "components/Tweet";
import smartContract from "services/smartContract";
import { web3 } from "services/smartContract";

// const Data = [
//   {
//     author: "0x1909CB943F38c3CFB957744F2CCC7775e163E745",
//     content: "test2",
//     timestamp: "2022-11-11",
//     id: 10,
//   },
//   {
//     author: "0x1909CB943F38c3CFB957744F2CCC7775e163E745",
//     content: "sdfsdfsdfsdsf",
//     timestamp: "2022-11-11",
//     id: 9,
//   },
//   {
//     author: "0x1909CB943F38c3CFB957744F2CCC7775e163E745",
//     content: "zxczxczxc",
//     timestamp: "2022-11-12",
//     id: 8,
//   },
//   {
//     author: "0x1909CB943F38c3CFB957744F2CCC7775e163E745",
//     content: "Hello",
//     timestamp: "2022-11-12",
//     id: 7,
//   },
//   {
//     author: "0x1909CB943F38c3CFB957744F2CCC7775e163E745",
//     content: "df",
//     timestamp: "2022-11-12",
//     id: 6,
//   },

//   {
//     author: "0x1909CB943F38c3CFB957744F2CCC7775e163E745",
//     content: "asd",
//     timestamp: "2022-11-12",
//     id: 5,
//   },
//   {
//     author: "0x3Abb6Da6E5b53c688597540b7d9795B8FDc02D4f",
//     content: "G2 Ethereum rocks!",
//     timestamp: "2022-11-20",
//     id: 4,
//   },
//   {
//     author: "0x885D3eB23fc981194dE9648B2DE91F2e23A57e37",
//     content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     timestamp: "2022-11-20",
//     id: 3,
//   },
//   {
//     author: "0x885D3eB23fc981194dE9648B2DE91F2e23A57e37",
//     content: "Wubalubadubdub!",
//     timestamp: "2022-11-20",
//     id: 2,
//   },
//   {
//     author: "0x3Abb6Da6E5b53c688597540b7d9795B8FDc02D4f",
//     content: "haha that YouTube video!!!",
//     timestamp: "2022-11-20",
//     id: 1,
//   },
// ];

const Content = ({ account }) => {
  const [tweets, setTweets] = useState([]);

  const updateTweets = (response) => {
    console.log(response);
    // let newTweets = [];
    // for (let i = response[0].length - 1; i >= 0; i--) {
    //   newTweets.push({
    //     author: response[0][i],
    //     id: response[1][i],
    //     content: response[2][i],
    //     timestamp: response[3][i],
    //   });
    // }
    // setTweets(newTweets);
  };

  useEffect(() => {
    smartContract.methods.getAllTweets().call().then(updateTweets);
    console.log(smartContract.methods.getAllTweets().call().then(updateTweets));
    let subscription = web3.eth.subscribe("newBlockHeaders", (error) => {
      if (!error) {
        smartContract.methods.getAllTweets().call().then(updateTweets);
      }
    });

    return subscription.unsubscribe((error, success) => {
      if (success) {
        console.log("Successfully unsubscribed");
      }
    });
  }, []);

  // const getNweets = async () => {
  //   setTweets([]);
  //   Data.forEach((data) => {
  //     const newTweetObj = {
  //       ...data,
  //     };
  //     setTweets((prev) => [newTweetObj, ...prev]);
  //   });
  // };
  // useEffect(() => {
  //   getNweets();
  //   console.log("get");
  //   console.log(tweets);
  // }, []);

  return (
    <Container sx={{ marginTop: 5 }}>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          author={tweet.author}
          content={tweet.content}
          timestamp={tweet.timestamp}
          id={tweet.id}
          account={account[0]}
        />
      ))}
    </Container>
  );
};

export default Content;
