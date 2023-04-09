import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <img
          src="LillyHeader2.png"
          alt="Lilly Header"
          sx={{ margin: "0", padding: "0" }}
        />
      </AppBar>
    </Box>
  );
}
