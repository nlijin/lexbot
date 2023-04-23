import "./App.css";
import { Container } from "@mui/material";
// import Header from "./components/Header";
import Footer from "./components/Footer";

import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Container maxWidth="lg" position="relative">
      {/* <Header /> */}
      <Chatbot />
      <Footer />
    </Container>
  );
}

export default App;
