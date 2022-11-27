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

function createdTimeToFormatted(time) {
  let now = new Date();
  let createdTime = new Date(time);

  let year = createdTime.getFullYear().toString();
  let month = (createdTime.getMonth() + 1).toString().padStart(2, "0");
  let date = createdTime.getDate().toString().padStart(2, "0");

  let toNow = now.getTime();
  let toCreated = createdTime.getTime();
  let passedTime = toNow - toCreated;
  let passedMin = Math.round(passedTime / (1000 * 60));
  let passedHour = Math.round(passedTime / (1000 * 60 * 60));
  let passedDay = Math.round(passedTime / (1000 * 60 * 60 * 24));

  if (passedDay > 0) {
    return `${year}.${month}.${date}`;
  } else if (passedHour === 1) {
    return `a hour ago`;
  } else if (passedHour > 0) {
    return `${passedHour} hours ago`;
  } else if (passedMin === 1) {
    return `a minute ago`;
  } else if (passedMin > 0) {
    return `${passedMin} minutes ago`;
  } else {
    return "now";
  }
}

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.content);
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      //delete
      console.log("delete", tweetObj.id);
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onChange = (event) => {
    setNewTweet(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    // update
    console.log(tweetObj, newTweet);
    setEditing(false);
    setNewTweet(tweetObj.content);
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
                {tweetObj.creator}
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
                {createdTimeToFormatted(tweetObj.createdAt)}
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
                    onClick={toggleEditing}
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
                {tweetObj.content}
              </Typography>
              {isOwner && (
                <>
                  <CardActions>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={toggleEditing}
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
