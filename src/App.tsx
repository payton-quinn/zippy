import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import logo from './logo.svg';
import Send from "./Send";
import Receive from "./Receive";

export interface FileModel {
  name: string,
  contents: any
}

export const BEGIN_MESSAGE = "begin";

export default function App() {
  return (
    <div className="App">
      <a className="github-fork-ribbon" href="https://adhoc.cool" data-ribbon="Our other app: Adhoc!" title="Our other app: Adhoc!">Our other app: Adhoc!</a>
      <div className="App-header">
        <a href="/"><img src={logo} className="App-logo" alt="Zippy" style={{marginBottom: -20}} /></a>
        <h1 style={{display: "none"}}>Zippy: one-to-one, peer-to-peer, end-to-end encrypted file sharing</h1>
        <h2 style={{fontSize: 22, bottom: "100%", paddingBottom: 100, fontStyle: "italic"}}>one-to-one, peer-to-peer, end-to-end encrypted file sharing</h2>
        <Router>
          <Switch>
            <Route path="/:senderId" component={Receive}>
            </Route>
            <Route path="/">
              <Send />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}