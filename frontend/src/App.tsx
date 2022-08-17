import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  BraveWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import React, { FC, ReactNode, useMemo } from "react";
import AppState from "./context/AppState";

import NavBar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import FindWork from "./Components/FindWork/FindWork";
import Profile from "./Components/Profile/Profile";
import Footer from "./Components/Footer/Footer";
import Settings from "./Components/Settings/Settings";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

require("./App.css");
require("@solana/wallet-adapter-react-ui/styles.css");

const App: FC = () => {
  return (
    <Context>
      <Content />
    </Context>
  );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint =
    "https://lively-spring-frost.solana-mainnet.quiknode.pro/f12deccb2850b65eccff5e7265bc2c26a39d91ec/";

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BraveWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <AppState>
          <WalletModalProvider>{children}</WalletModalProvider>
        </AppState>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Routes>
          <Route path={"/"} element={<FindWork />} />
          <Route path={"/find-work"} element={<FindWork />} />
          <Route path={"/u/:id"} element={<Profile />} />
          <Route path={"/settings"} element={<Settings />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};
