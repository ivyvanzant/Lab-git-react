// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

  const users = {
    users_list: [
      { 
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      },
      {
        "id": "qwe123",
        "job": "Zookeeper",
        "name": "Cindy"
      }
    ]
  };

  app.get("/", (req, res) => {
    res.send("Welcome to the User API!");
  });

  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = users["users_list"];

    if (name && job) {
    result = findUsersByNameAndJob(name, job);
  } else if (name) {
    result = findUsersByName(name);
  } else if (job) {
    result = findUsersByJob(job);
  }

  res.send({ users_list: result });
});

const findUsersByName = (name) => 
  users["users_list"].filter(user => user["name"] === name);

const findUsersByJob = (job) => 
  users["users_list"].filter(user => user["job"] === job);

const findUsersByNameAndJob = (name, job) => 
  users["users_list"].filter(user => user["name"] === name && user["job"] === job);

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);



app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

const deleteUser = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1); // Remove the user from the list
    return true;
  } else {
    return false;
  }
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const success = deleteUser(id);
  if (success) {
    res.status(200).send(`User with id ${id} deleted.`);
  } else {
    res.status(404).send("Resource not found.");
  }
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );

});



