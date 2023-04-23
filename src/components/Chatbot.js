import React, { useState } from "react";
import axios from "axios";
import {
  Paper,
  Box,
  Grid,
  // Button,
  TextField,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import RefreshIcon from "@mui/icons-material/Refresh";
// import FloatingActionButtons from "./floatingButton";
// import ControlledAccordions from "./AccordianX";
// import { ContactInfo } from "./ContactInfo";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleAnswerChange = (e) => {
    if (e.code === "Enter") {
      sendPostRequest();
    }
  };

  const handleClear = (event) => {
    setMessageHistory([]);
  };

  const sendPostRequest = async () => {
    try {
      const response = await axios.post(
        "https://6rzzjwudya.execute-api.us-east-1.amazonaws.com/DEV/lexbot",
        { Ques: input }
      );

      let parsedResponse = "";
      const responseString = response.data.trim();
      if (
        responseString.startsWith("Please find the result for the query below")
      ) {
        const jsonString = responseString.split("\n")[1].replace(/'/g, '"');
        try {
          parsedResponse = JSON.parse(jsonString);
        } catch {
          parsedResponse = jsonString;
        }
      } else {
        parsedResponse = responseString;
      }

      setMessageHistory([
        ...messageHistory,
        { Ques: input, response: parsedResponse },
      ]);
      setInput(""); // Clear input after sending message
    } catch (error) {
      console.error(error);
      setMessageHistory([
        ...messageHistory,
        {
          Ques: input,
          response: `Error: ${"there are no particular files related to this"}`,
        },
      ]);
      setInput(""); // Clear input after sending message
    }
  };

  return (
    <Grid>
      <Paper elevation={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            // background: "red",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "1rem",
              background: "#D52B1E",
              boxSizing: "content-box",
            }}
          >
            <Typography
              color="white"
              fontWeight="bold"
              variant="h6"
              component="span"
              fontFamily="monospace"
            >
              Chatbot
            </Typography>
          </Box>

          <Box
            //auto scroll to bottom of the window when new message is added
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              overflowY: "auto",
              padding: "1rem",
              height: "60vh",
              boxSizing: "content-box",
            }}
          >
            {messageHistory.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <Typography
                  fontWeight="bold"
                  variant="body1"
                  component="span"
                  fontFamily="monospace"
                >
                  Ques:
                </Typography>
                <Typography
                  fontWeight="bold"
                  variant="body1"
                  component="span"
                  fontFamily="monospace"
                >
                  {message.Ques}
                </Typography>
                <Typography
                  fontWeight="bold"
                  variant="body1"
                  component="span"
                  fontFamily="monospace"
                >
                  Ans:
                </Typography>
                <Typography
                  fontWeight="bold"
                  variant="body1"
                  component="span"
                  fontFamily="monospace"
                >
                  {message.response}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "1rem",
              background: "#D52B1E",
              boxSizing: "content-box",
            }}
          >
            <Grid container justifyContent="flex-end" alignItems="center">
              <TextField
                id="outlined-basic"
                label="Type your question here"
                autoFocus
                variant="outlined"
                size="large"
                fullWidth
                value={input}
                autoComplete="false"
                onChange={handleInputChange}
                onKeyDown={handleAnswerChange}
                sx={{ background: "white", borderRadius: "1rem" }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "5rem",
                  // background: "yellow",
                }}
              >
                <RefreshIcon
                  fontSize="large"
                  onClick={handleClear}
                  sx={{
                    marginX: "1rem",
                    marginY: "1rem",
                    cursor: "pointer",
                    color: "#D52B1E",
                  }}
                />
                <Send
                  onClick={sendPostRequest}
                  fontSize="large"
                  sx={{
                    marginX: "0.2rem",
                    marginY: "2rem",
                    cursor: "pointer",
                    color: "#D52B1E",
                  }}
                />
              </Box>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Chatbot;

// "https://6rzzjwudya.execute-api.us-east-1.amazonaws.com/DEV/lexbot",
