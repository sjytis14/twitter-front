import React, { useState } from "react";
import { Container, TextField, Button, FormControl } from "@mui/material";
import smartContract from "services/smartContract";

const NewTweetFactory = ({ account }) => {
	const [newTweet, setNewTweet] = useState("");

	const handleSubmit = async (tweet) => {
		smartContract.methods.addTweet(tweet).send({ from: account[0] });
		setNewTweet("");
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		handleSubmit(newTweet);
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
					disabled={account[0] === undefined}
				>
					TWEET
				</Button>
			</FormControl>
		</Container>
	);
};

export default NewTweetFactory;
