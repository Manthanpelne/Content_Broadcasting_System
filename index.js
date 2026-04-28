const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config()

const authRoutes = require("./src/routes/authRoutes")
const contentRoutes = require("./src/routes/contentRoutes")


app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/auth",authRoutes)
app.use("/api/content", contentRoutes)



app.listen(3000, () => console.log('Server running on port 3000'));