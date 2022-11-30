import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import NewTweetFactory from "components/NewTweetFactory";
import Content from "components/Content";
import { web3 } from "services/smartContract";

/**
 * @dev A function that shows the body (error messages, NewTweetFactory and Content)
 * @param {error} Message when an error occurs
 * @returns  Body including NewTweetFactory and Content
 */
const Home = ({ error }) => {
  const [account, setAccount] = useState("");

  /**
   * @dev When rendering for the first time, get the account
   */
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
      <Box sx={{ textAlign: "center" }}>
        {error && (
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ color: "red" }}
          >
            {error}
          </Typography>
        )}
      </Box>
      <NewTweetFactory account={account} />
      <Content account={account} />
    </Container>
  );
};

export default Home;
