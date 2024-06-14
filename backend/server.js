const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 8081; // Your desired port

// MySQL Connection Configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ims",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});

// Endpoint to fetch products from the database
app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).json({ error: "Error fetching products" });
      return;
    }

    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
