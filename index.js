const express = require('express');
const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes


app.listen(3000, () => console.log('Server running on port 3000'));