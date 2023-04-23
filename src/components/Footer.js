import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://website.com/"></Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        top: "auto",
        bottom: "0",
        backgroundColor: "gray",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: "auto",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ cursor: "pointer" }}
          >
            Lilly
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
