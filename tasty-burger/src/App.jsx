import React from "react";
import Navbar from "./components/Navbar";
import MainScreen from "./components/mainscreen";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <MainScreen />
    </div>
  );
}