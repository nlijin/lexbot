import "./App.css";
import Chatbot from "./components/Chatbot";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import ControlledAccordions from "./components/AccordianX";

function App() {
  return (
    <Container maxWidth="lg" position="relative">
      <Header />
      <Chatbot />
      <Footer />
    </Container>
  );
}

export default App;
