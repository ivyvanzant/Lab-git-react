// backend.js
import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import { getAllUsers, getUserById, createUser, deleteUserById, getUsersByNameAndJob } from './user-services.js'; // Added getUsersByNameAndJob


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/usersDB')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the User API!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name && job) {
    // Fetch users by both name and job
    getUsersByNameAndJob(name, job)
      .then(users => res.json({ users_list: users }))
      .catch(err => res.status(500).json({ error: err.message }));
  } else {
  getAllUsers()
    .then(users => res.json({ users_list: users }))
    .catch(err => res.status(500).json({ error: err.message }));
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  getUserById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch(err => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).json({ error: "Invalid ID format." });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
});

 app.post("/users", (req, res) => {
  const userToAdd = req.body;

  createUser(userToAdd)
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(500).json({ error: err.message }));
});

 app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  deleteUserById(id)
    .then(deletedUser => {
      if (deletedUser) {
        res.status(204).send(); // User deleted successfully
      } else {
        res.status(404).json({ message: "User not found." });
      }
    })
    .catch(err => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).json({ error: "Invalid ID format." });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
});

 app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



