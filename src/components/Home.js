import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import NewTweetFactory from "./NewTweetFactory";
import Tweet from "./Tweet";

const Data = [
  {
    creator: "0x1909CB943F38c3CFB957744F2CCC7775e163E745",
    content: "test2",
    createdAt: "2022-11-11",
    id: 10,
  },
  {
    creator: "0x1909CB943F38c3CFB957744F2CCC7775e163E745",
    content: "sdfsdfsdfsdsf",
    createdAt: "2022-11-11",
    id: 9,
  },
  {
    creator: "0x1909CB943F38c3CFB957744F2CCC7775e163E745",
    content: "zxczxczxc",
    createdAt: "2022-11-12",
    id: 8,
  },
  {
    creator: "0x1909CB943F38c3CFB957744F2CCC7775e163E745",
    content: "Hello",
    createdAt: "2022-11-12",
    id: 7,
  },
  {
    creator: "0x1909CB943F38c3CFB957744F2CCC7775e163E745",
    content: "df",
    createdAt: "2022-11-12",
    id: 6,
  },

  {
    creator: "0x1909CB943F38c3CFB957744F2CCC7775e163E745",
    content: "asd",
    createdAt: "2022-11-12",
    id: 5,
  },
  {
    creator: "0x3Abb6Da6E5b53c688597540b7d9795B8FDc02D4f",
    content: "G2 Ethereum rocks!",
    createdAt: "2022-11-20",
    id: 4,
  },
  {
    creator: "0x885D3eB23fc981194dE9648B2DE91F2e23A57e37",
    content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "2022-11-20",
    id: 3,
  },
  {
    creator: "0x885D3eB23fc981194dE9648B2DE91F2e23A57e37",
    content: "Wubalubadubdub!",
    createdAt: "2022-11-20",
    id: 2,
  },
  {
    creator: "0x3Abb6Da6E5b53c688597540b7d9795B8FDc02D4f",
    content: "haha that YouTube video!!!",
    createdAt: "2022-11-20",
    id: 1,
  },
];

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  const getNweets = async () => {
    // const dbNweets = await dbService.collection("nweets").get();
    // dbNweets.forEach((document) => {
    // const newTweetObj = {
    //   ...document.data(),
    //   id: document.id,
    // };
    // setTweets((prev) => [newTweetObj, ...prev]);
    // });
    setTweets([]);
    Data.forEach((data) => {
      const newTweetObj = {
        ...data,
      };
      setTweets((prev) => [newTweetObj, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
    console.log("get");
    console.log(tweets);
  }, []);

  return (
    <Container
      sx={{
        marginTop: 5,
        alignItems: "center",
      }}
      fixed
    >
      <NewTweetFactory
        userObj={userObj}
        tweets={tweets}
        setTweets={setTweets}
      />
      <Container sx={{ marginTop: 5 }}>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creator === userObj.id}
          />
        ))}
      </Container>
    </Container>
  );
};

export default Home;
