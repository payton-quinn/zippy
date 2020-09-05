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
      <div className="App-header">
        <img src={logo} className="App-logo" alt="Zippy" style={{marginBottom: -20}} />
        <h1 style={{fontSize: 22, bottom: "100%", paddingBottom: 100, fontStyle: "italic"}}>one-to-one, peer-to-peer, end-to-end encrypted file sharing</h1>
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