import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import { useMoralis } from "react-moralis";

const HomePage = () => {
  const { isWeb3Enabled } = useMoralis();

  return (
    <>
      <Navbar />
      {isWeb3Enabled ? (
        <div>Web3 is enabled</div>
      ) : (
        <h1>Please connect wallet</h1>
      )}
    </>
  );
};

export default HomePage;
