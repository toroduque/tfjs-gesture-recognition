import React from "react";
import { Link } from 'react-router-dom';
import Icon from "../Images/Icon";


export default function Landing() {
  const glyphsNames = [
    "thumb-left",
    "thumb-right",
    "one-fingers",
    "two-fingers",
    "three-fingers",
  ];

  return (
    <div style={{display: "flex", justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
      <h1>Welcome to Gestures Recognition</h1>
      <p>
        This is a concept project in to navigate a website using the gestures of
        your hands. No mouse, No keywords.
      </p>
      <p>
        By using the following five hands gestures you can go through the different pages of
        the site.
      </p>

      <div style={{maxWidth: '70%', width: '100%', display: "flex", alignItems: 'center', justifyContent: 'space-around', margin: '50px 0'}}>
        { glyphsNames.map(glyph => <Icon glyph={glyph} color="white"/>)}
      </div>
      <p>But first we'll need to train the Deep Learning model to recognize your gestures.</p>
      <div style={{width: '100%', display:'flex', justifyContent: 'center', marginTop:'20px'}}>
        <Link to="/training">
            <h3 style={{color: 'white', border:'solid 1px white', padding: '10px 20px'}}>Start Training!</h3>
        </Link>               
      </div>
    </div>
  );
}
