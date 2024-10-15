import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
   else if (name && job) {
    promise = getUsersByNameAndJob(name, job);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

const getUsersByNameAndJob = (name, job) => {
  return userModel.find({ name: name, job: job }); // Both conditions must match
};

function createUser(userData) {
  const user = new userModel(userData);
  return user.save();
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

function getAllUsers(name, job) {
  let query = {};
  if (name) query.name = name;
  if (job) query.job = job;
  return userModel.find(query); // Fetch all users or filter based on name and job
}

function getUserById(id) {
  return userModel.findById(id); // Find a user by MongoDB ObjectId
}

export {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  getUsersByNameAndJob,
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById
};

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  getUsersByNameAndJob,
};
