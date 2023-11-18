import "./App.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./privateRoutes";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
