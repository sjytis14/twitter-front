// import { TextField } from "@material-ui/core";
import { Container, TextField, Button, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";

const NewTweetFactory = ({ userObj, tweets, setTweets }) => {
  const [newTweet, setNewTweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    // await dbService.collection("nweets").add({
    //   newTweet,
    //   createdAt: Date.now(),
    // });
    setTweets([
      {
        content: newTweet,
        creator: userObj.id,
        createdAt: Date.now(),
        id: tweets.length + 1,
      },
      ...tweets,
    ]);
    console.log("submit");
    setNewTweet("");
  };

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
          onClick={onSubmit}
        >
          TWEET
        </Button>
      </FormControl>
    </Container>
  );
};

export default NewTweetFactory;
