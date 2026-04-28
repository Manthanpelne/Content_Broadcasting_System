const express = require('express');
const router = express.Router();
const { uploadContent, approveContent, getLiveContent } = require('../controllers/contentController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');


// Teacher uploads:
router.post('/upload', 
  authenticateToken, 
  authorizeRole('TEACHER'), 
  upload.single('file'), // Multer middleware
  uploadContent  
);

// Principal approves:
router.patch('/:id/status', 
  authenticateToken, 
  authorizeRole('PRINCIPAL'), 
  approveContent
);

router.get("/live/:teacherId", getLiveContent)

module.exports = router;