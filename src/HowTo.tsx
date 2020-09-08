import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import Footer from './Footer';

const HowTo = () => {
  return (
  <>
    <h1>How to use <Link to="/"><img src={logo} className="App-logo-small" alt="Zippy" style={{marginBottom: -40}} /></Link></h1>
    <ol>
      <li>
        Click the button to generate a link.
      </li>

      <li>
        Click the button to copy the link.
      </li>

      <li>
        Send the link to the file recipient.
      </li>

      <li>
        Wait for them to click "connect".
      </li>

      <li>
        Select the file you wish to transfer.
      </li>

      <li>
        Wait for the transfer to complete.
      </li>

    </ol>
    <Footer />
  </>
  );
}

export default HowTo;
