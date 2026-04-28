// controllers/authController.js
const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { 
        email, 
        passwordHash: hashedPassword, 
        role: role.toUpperCase() 
      },
    });
    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.error("Signup error:", error);
    res.status(500).json({ error: 'User registration failed' });
  }
};




const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    
    console.log("DEBUG: Attempting to find user with email:", email);
    const user = await prisma.user.findUnique({ where: { email } });
  
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  
    res.json({ token, role: user.role });
  }
    catch (error) {
  console.log("Prisma Error Code:", error.code);
  console.log("Error Message:", error.message);
  res.status(500).json({ error: "Database query failed" });
}
};



module.exports = { signup, login };