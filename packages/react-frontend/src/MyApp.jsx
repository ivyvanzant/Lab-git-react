// src/MyApp.jsx

import React, {useState, useEffect} from 'react';
import ReactDOMClient from "react-dom/client";
import "./main.css";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (response.status === 204) {
        const updated = characters.filter((character) => character.id !== id);
        setCharacters(updated);
      } else if (response.status === 404) {
        console.error(`User with ID ${id} not found`);
      } else {
        console.error(`Failed to delete user with ID ${id}. Status code: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
  }

  const [tableKey, setTableKey] = useState(0);
    
  function updateList(person) { 
    postUser(person)
      .then((data) => {
        console.log("New user added:", data);
        setCharacters((prevCharacters) => [...prevCharacters, data]);
      })
      .catch((error) => {
        console.log("Error adding user:", error);
      });
  }

  function fetchUsers() {
    return fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function postUser(person) {
     return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
    .then((response) => {
      console.log("Backend response:", response); 
      if (response.status === 201) {
        return response.json();  // Parse the JSON from the backend
      } else {
        throw new Error(`Failed to add user. Status code: ${response.status}`);
      }
    });
  }


  return (
    <div className="container">
      <Table
        key={tableKey}
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;