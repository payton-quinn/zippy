import React from "react";
import logo from './logo.svg';

export default function AppHeader() {
  return (
    <>
      <a href="/"><img src={logo} className="App-logo" alt="Zippy" style={{marginBottom: -20}} /></a>
      <h1 style={{display: "none"}}>Zippy: one-to-one, peer-to-peer, end-to-end encrypted file sharing</h1>
      <h2 style={{fontSize: 22, bottom: "100%", paddingBottom: 100, fontStyle: "italic"}}>one-to-one, peer-to-peer, end-to-end encrypted file sharing</h2>
    </>
  );
}