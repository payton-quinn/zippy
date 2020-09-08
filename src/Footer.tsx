import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
      <>
        <span style={{fontSize: 14, position: "absolute", bottom: 3}}>
        Copyright © Zippy 2020 &nbsp; | &nbsp; <Link style={{textDecoration: "none", color: "white", fontStyle: "italic"}} to="/howto" >How to use Zippy</Link>
        </span>
      </>
    );
};
