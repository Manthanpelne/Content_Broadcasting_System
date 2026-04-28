const express = require('express');
const app = express();
const authRoutes = require("./src/routes/authRoutes")
app.use(express.json());
require("dotenv").config()

app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/auth",authRoutes)


app.listen(3000, () => console.log('Server running on port 3000'));