import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import NewTweetFactory from "components/NewTweetFactory";
import Content from "components/Content";
import { web3 } from "services/smartContract";

const Home = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    web3.eth.getAccounts().then(setAccount);

    async function listenMMAccount() {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", async function () {
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts);
        });
      }
    }
    listenMMAccount();
  }, []);

  return (
    <Container
      sx={{
        marginTop: 5,
        alignItems: "center",
      }}
      fixed
    >
      <NewTweetFactory account={account} />
      <Content account={account} />
    </Container>
  );
};

export default Home;
