import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  FormControl,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import smartContract from "services/smartContract";
import { web3 } from "services/smartContract";

const moment = require("moment");

/**
 * @dev A function that shows one tweet
 * @param {author} Tweet author to display
 * @param {content} Tweet content to display
 * @param {timestamp} Tweet timestamp to display
 * @param {id} Tweet ID to display
 * @param {account} The current user account
 * @returns A tweet
 */
const Tweet = ({ author, content, timestamp, id, account }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(content);

  /**
   * @dev Delete a tweet
   */
  const handleDelete = async () => {
    try {
      smartContract.methods.deleteTweet(id).send({ from: account });
    } catch (error) {
      window.alert("Something went wrong. Please try again.");
    }
  };

  /**
   * @dev Make sure user wants to delete
   */
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      handleDelete();
      console.log("delete", id);
    }
  };

  /**
   * @dev Stores the value whenever an input occurs.
   * @param {event} onChange event
   */
  const onChange = (event) => {
    setNewTweet(event.target.value);
  };

  /**
   * @dev Update a tweet
   */
  const handleSubmit = async () => {
    const userAccount = await web3.eth.getAccounts();
    smartContract.methods
      .updateTweet(id, newTweet)
      .send({ from: userAccount[0] })
      .then(() => {
        setEditing(false);
      });
  };

  /**
   * @dev Stop edit mode and initialize the textfield when user clicks the submit button
   * @param {event} onSubmit event
   */
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(newTweet);

    setEditing(false);
    setNewTweet(content);
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent sx={{ margin: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" component="div">
                {author}
              </Typography>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  mx: "2px",
                  transform: "scale(0.8)",
                  alignSelf: "center",
                }}
              >
                •
              </Box>
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                sx={{ alignSelf: "center" }}
              >
                {moment.unix(timestamp).fromNow()}
              </Typography>
            </Box>
          </Box>
          {editing ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <FormControl>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={2}
                  placeholder="Edit your tweet"
                  value={newTweet}
                  onChange={onChange}
                />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton
                    aria-label="cancel"
                    size="small"
                    onClick={() => (
                      setEditing((prev) => !prev), setNewTweet(content)
                    )}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    aria-label="update"
                    size="small"
                    onClick={onSubmit}
                  >
                    <CheckIcon color="primary" fontSize="inherit" />
                  </IconButton>
                </CardActions>
              </FormControl>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Typography variant="body2" component="div" width="100%">
                {content}
              </Typography>
              {account === author && (
                <>
                  <CardActions>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => (
                        setEditing((prev) => !prev), setNewTweet(newTweet)
                      )}
                      disabled={editing}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={onDeleteClick}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </CardActions>
                </>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Tweet;
