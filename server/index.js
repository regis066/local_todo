// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes/route");
// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Enable CORS to allow cross-origin requests
app.use(cors());

// Connect to the database
const connectToDB = require("./db/connection");
connectToDB();

// Define the port to listen on
const port = process.env.PORT || 8000;

// Define routes and their handlers

app.use('/api', routes)
app.get('/', (req, res) => {
  return res.json({ "message": "Welcome to Our To Do App!" });
});

// Define additional routes and handlers here

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port: [${port}]`);
});
