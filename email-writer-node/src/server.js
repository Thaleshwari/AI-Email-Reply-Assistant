require("dotenv").config();
const express = require("express");
const cors = require("cors");
const emailRoutes = require("./routes/emailRoutes");

/**
 * Equivalent to Spring Boot's EmailWriterSbApplication.java
 * This is the main entry point of the application.
 */

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
// Equivalent to @CrossOrigin(origins = "*") on the controller
app.use(cors());

// Parses incoming JSON request bodies — equivalent to Spring's auto @RequestBody parsing
app.use(express.json());

// Mount routes — equivalent to @RequestMapping("/api/email")
app.use("/api/email", emailRoutes);

// Health check endpoint (bonus)
app.get("/", (req, res) => {
  res.send("Email Writer API is running.");
});

// Start the server — equivalent to SpringApplication.run(...)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
