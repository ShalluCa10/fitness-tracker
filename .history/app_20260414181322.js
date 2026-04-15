const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use("/", require("./routes/index"));
app.use("/quotes", require("./routes/quotes"));
app.use("/workout", require("./routes/workout"));


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});