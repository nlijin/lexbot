import React, { useState } from "react";
import axios from "axios";
import {
  Paper,
  Box,
  Grid,
  // Button,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MinimizeIcon from "@mui/icons-material/Minimize";
import AddIcon from "@mui/icons-material/Add";
// import FloatingActionButtons from "./floatingButton";
// import ControlledAccordions from "./AccordianX";
// import { ContactInfo } from "./ContactInfo";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

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

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
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

  //need to fix the bot height
  //add a header to the bot

  return (
    <Grid
      container
      height={isMinimized ? "80vh" : "80vh"}
      bgcolor="whitesmoke"
      padding="1rem"
      justifyContent="flex-end"
      alignItems="flex-end"
    >
      {/* <Paper elevation={8}>
        <ContactInfo />
      </Paper> */}
      <Paper elevation={8}>
        <Box width="25rem">
          <Box
            sx={{
              bgcolor: "#D52B1E",
              paddingX: "1rem",
              paddingY: "0.4rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "1px",
            }}
          >
            <Typography
              color="white"
              fontWeight="bold"
              variant="h6"
              component="span"
              fontFamily="monospace"
            >
              Lilly
            </Typography>
            <div>
              {isMinimized ? (
                <>
                  <AddIcon
                    onClick={toggleMinimized}
                    sx={{
                      marginX: "1rem",
                      marginY: "0.5rem",
                      cursor: "pointer",
                      color: "white",
                    }}
                  />
                </>
              ) : (
                <>
                  <MinimizeIcon
                    onClick={toggleMinimized}
                    sx={{
                      marginX: "1rem",
                      marginY: "0.5rem",
                      cursor: "pointer",
                      color: "white",
                    }}
                  />
                </>
              )}
            </div>
          </Box>

          {!isMinimized && (
            <Box
              sx={{
                padding: "1rem",
                height: "200px",
                overflow: "hidden",
                overflowY: "scroll",
                background: "#FAFAFA",
              }}
            >
              {messageHistory.map((message, index) =>
                message.response.Link ? (
                  <Box key={index}>
                    <Typography
                      color="blue"
                      align="right"
                      fontSize="1rem"
                      fontFamily="Calibri"
                      background="green"
                    >
                      <p>{message.Ques}</p>
                    </Typography>

                    <Typography
                      color="maroon"
                      fontSize="1rem"
                      fontFamily="Calibri"
                      style={{ lineBreak: "normal" }}
                    >
                      <p>{message.response.PageTitle}</p>
                    </Typography>
                    <Typography
                      color="maroon"
                      fontSize="1rem"
                      fontFamily="Calibri"
                      style={{ lineBreak: "normal" }}
                    >
                      <p>{message.response.Summary}</p>
                    </Typography>
                    <Typography
                      fontSize="1rem"
                      fontFamily="Calibri"
                      style={{ lineBreak: "anywhere" }}
                    >
                      <Link
                        href={message.response.Link}
                        underline="hover"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {message.response.Link}
                      </Link>
                    </Typography>
                  </Box>
                ) : (
                  <Box key={index}>
                    <Typography
                      color="blue"
                      align="right"
                      fontSize="1rem"
                      fontFamily="Calibri"
                    >
                      <p>{message.Ques}</p>
                    </Typography>

                    <Typography
                      color="maroon"
                      fontSize="1rem"
                      fontFamily="Calibri"
                      style={{ lineBreak: "normal" }}
                    >
                      <p>{message.response}</p>
                    </Typography>
                  </Box>
                )
              )}
            </Box>
          )}

          {!isMinimized && (
            <Box
              sx={{
                flexGrow: 1,
                padding: "1rem",
                background: "#FAFAFA",
              }}
            >
              <Grid
                container
                justifyContent="flex-end"
                alignItems="center"
                // sx={{ background: "yellow" }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={input}
                  autoComplete="false"
                  onChange={handleInputChange}
                  onKeyDown={handleAnswerChange}
                  sx={{ background: "white" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "3rem",
                    // background: "yellow",
                  }}
                >
                  <RefreshIcon
                    fontSize="medium"
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
                    fontSize="small"
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
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default Chatbot;

// "https://6rzzjwudya.execute-api.us-east-1.amazonaws.com/DEV/lexbot",
