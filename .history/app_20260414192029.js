
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
global.dashboard = {
    workouts: [],
    quotess: []
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// let calorieList = [];
// let searchHistory = [];


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes/index"));
app.use("/quotes", require("./routes/quotes"));
app.use("/workout", require("./routes/workout"));
app.use("/dashboard", require("./routes/dashboard"));

// app.use((req, res, next) => {
//     res.locals.history = searchHistory;
//     next();
// });
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});