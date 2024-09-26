// src/MyApp.jsx

import React, { useState } from "react";
import ReactDOMClient from "react-dom/client";
import "./main.css";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  return (
    <div className="container">
      <Table 
        characterData={characters}
        removeCharacter={removeOneCharacter}
        />
    </div>
  );

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form />
    </div>
  );
}


export default MyApp;