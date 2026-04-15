const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const quoteRes = await axios.get("https://type.fit/api/quotes");
 router.get("/", async (req, res) => {  try {    const response = await axios.get(      "https://wger.de/api/v2/exerciseinfo/?language=2&limit=50"    );    const exercises = response.data.results || [];    // group by category    const categoriesMap = {};    exercises.forEach(ex => {      const category = ex.category?.name || "Other";      if (!categoriesMap[category]) {        categoriesMap[category] = {          name: category,          image: ex.images?.[0]?.image || null,          count: 0        };      }      categoriesMap[category].count++;    });    const categories = Object.values(categoriesMap);    res.render("home", { categories });  } catch (err) {    console.log(err);    res.render("home", { categories: [] });  }});module.exports = router;

🎨 STEP 2 — HOME PAGE UI (BIG CARDS)
Replace home.pug
doctype htmlhtml  head    title Home    link(rel="stylesheet", href="/style.css")  body    include partials/header    h1 Workout Categories 💪    .grid      if categories && categories.length > 0        each cat in categories          a.card(href=`/workout/${cat.name}`)            .card-img              if cat.image                img(src=cat.image, alt=cat.name)              else                img(src="https://placehold.co/400x250/png?text=Workout")            .card-body              h2= cat.name              p= cat.count + " exercises"      else        p Loading categories...    include partials/footer

🧭 STEP 3 — ROUTE FOR DETAIL PAGE
Create:
👉 routes/workout.js
const express = require("express");const router = express.Router();const axios = require("axios");router.get("/:category", async (req, res) => {  try {    const categoryName = req.params.category;    const response = await axios.get(      "https://wger.de/api/v2/exerciseinfo/?language=2&limit=100"    );    const exercises = response.data.results || [];    const filtered = exercises.filter(      ex => ex.category?.name === categoryName    );    res.render("workout-detail", {      category: categoryName,      exercises: filtered    });  } catch (err) {    console.log(err);    res.render("workout-detail", {      category: "Workout",      exercises: []    });  }});module.exports = router;

📄 STEP 4 — WORKOUT DETAIL PAGE
views/workout-detail.pug
doctype htmlhtml  head    title Workout Details    link(rel="stylesheet", href="/style.css")  body    include partials/header    h1= category + " Workouts"    .grid      if exercises && exercises.length > 0        each ex in exercises          .card            h3= ex.translations?.[0]?.name || "No name"            if ex.images && ex.images.length > 0              img(src=ex.images[0].image)            if ex.translations && ex.translations.length > 0              p!= ex.translations[0].description      else        p No exercises found    include partials/footer

🎨 STEP 5 — CSS FOR BIG CARDS
Add this:
.grid {  display: grid;  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));  gap: 20px;  padding: 20px;}.card {  background: white;  border-radius: 15px;  overflow: hidden;  box-shadow: 0 5px 20px rgba(0,0,0,0.1);  text-decoration: none;  color: black;  transition: 0.3s;}.card:hover {  transform: translateY(-5px);}.card-img img {  width: 100%;  height: 180px;  object-fit: cover;}.card-body {  padding: 15px;}.card-body h2 {  margin: 0;}

🚀 FINAL RESULT
🏠 Home Page:
✔ Workout categories
✔ Big image cards
✔ Exercise count
✔ Clean UI
👉 Click card:
✔ Goes to category page
✔ Shows exercises
✔ Images + descriptions


const banners = quoteRes.data.slice(0, 5).map(q => ({
  text: q.text,
  author: q.author || "Unknown"
}));

  res.render("home", {
    banners,
    exercises: workoutRes.data.results || []
  });
});

module.exports = router;