const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// View engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static("public"));

// Routes
app.use("/", require("./routes/index"));
app.use("/workout", require("./routes/workout"));
app.use("/quotes", require("./routes/quotes"));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});