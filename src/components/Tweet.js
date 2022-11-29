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

const Tweet = ({ author, content, timestamp, id, account }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(content);

  const handleDelete = async () => {
    try {
      smartContract.methods.deleteTweet(id).send({ from: account });
    } catch (error) {
      window.alert("Something went wrong. Please try again.");
    }
  };

  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      handleDelete();
      console.log("delete", id);
    }
  };

  const onChange = (event) => {
    setNewTweet(event.target.value);
  };

  const handleSubmit = async () => {
    const userAccount = await web3.eth.getAccounts();
    smartContract.methods
      .updateTweet(id, newTweet)
      .send({ from: userAccount[0] })
      .then(() => {
        setEditing(false);
      });
  };

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
