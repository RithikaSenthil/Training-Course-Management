const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
let courses = [
  { id: 1, title: "Course 1", description: "Description 1", duration: "2 weeks" },
   
];
app.get("/courses", (req, res) => {
  res.json({ courses });
});
app.post("/courses", (req, res) => {
  const { title, description, duration } = req.body;
  const id = courses.length > 0 ? courses[courses.length - 1].id + 1 : 1;
  const newCourse = { id, title, description, duration };
  courses.push(newCourse);
  res.json({ message: "Course added successfully", course: newCourse });
});
app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, duration } = req.body;
  const index = courses.findIndex(course => course.id == id);
  if (index !== -1) {
    courses[index] = { id: parseInt(id), title, description, duration };
    res.json({ message: "Course updated successfully", course: courses[index] });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});
app.delete("/courses/:id", (req, res) => {
  const { id } = req.params;
  courses = courses.filter(course => course.id != parseInt(id)); 
  res.json({ message: "Course deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
