import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MainScreen from "./components/MainScreen";
import PromoModal from "./components/PromoModal";

export default function App(): JSX.Element {
  const [showPromo, setShowPromo] = useState(false);

  return (
    <div className="app">
      <Navbar onOpenPromo={() => setShowPromo(true)} />
      <MainScreen />
      <PromoModal isOpen={showPromo} onClose={() => setShowPromo(false)} />
    </div>
  );
}
