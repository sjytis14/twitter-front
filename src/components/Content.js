import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Tweet from "components/Tweet";
import smartContract from "services/smartContract";
import { web3 } from "services/smartContract";

const Content = ({ account }) => {
  const [tweets, setTweets] = useState([]);

  const updateTweets = (response) => {
    let newTweets = [];
    for (let i = response.length - 1; i >= 0; i--) {
      newTweets.push({
        author: response[i][0],
        id: response[i][1],
        content: response[i][2],
        timestamp: response[i][3],
      });
    }
    setTweets(newTweets);
  };

  useEffect(() => {
    smartContract.methods.getAllTweets().call().then(updateTweets);
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
