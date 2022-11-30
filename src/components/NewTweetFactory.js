import React, { useState } from "react";
import { Container, TextField, Button, FormControl } from "@mui/material";
import smartContract from "services/smartContract";

/**
 * @dev A function that shows an input form to tweet
 * @param {account} The current connected account
 * @returns Input form
 */
const NewTweetFactory = ({ account }) => {
  const [newTweet, setNewTweet] = useState("");

  /**
   * @dev Add tweet with the current user account
   * @param {tweet} Tweet content to register
   */
  const handleSubmit = async (tweet) => {
    smartContract.methods.addTweet(tweet).send({ from: account[0] });
    setNewTweet("");
  };

  /**
   * @dev Stores the value whenever an input occurs.
   * @param {event} onChange event
   */
  const onChange = (event) => {
    setNewTweet(event.target.value);
  };

  return (
    <Container fixed>
      <FormControl fullWidth sx={{ alignItems: "flex-end" }}>
        <TextField
          id="outlined-multiline-static"
          label="Enter your tweet!"
          multiline
          rows={4}
          value={newTweet}
          fullWidth
          onChange={onChange}
        />
        <Button
          size="medium"
          sx={{ width: "10%", marginTop: 1 }}
          onClick={(event) => {
            event.preventDefault();
            handleSubmit(newTweet);
          }}
          disabled={account[0] === undefined}
        >
          TWEET
        </Button>
      </FormControl>
    </Container>
  );
};

export default NewTweetFactory;
