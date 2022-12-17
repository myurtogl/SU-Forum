import React, { Component, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import Navbar from "./Navbar";

const App = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    loadWeb3();
    loadAccountData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadAccountData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setAccount(accounts[0]);
  };

  return (
    <div>
      <Navbar account={account} />
    </div>
  );
};

export default App;
