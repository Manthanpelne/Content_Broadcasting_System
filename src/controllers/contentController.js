// controllers/contentController.js
const prisma = require('../config/prisma');

const uploadContent = async (req, res) => {
  try {
    const { title, description, subject, startTime, endTime, rotationDuration } = req.body;
    const rawFilePath = req.file.path;

    const normalizedPath = rawFilePath.replace(/\\/g, '/');

    const content = await prisma.content.create({
      data: {
        title,
        description,
        subject,
        fileUrl : normalizedPath,
        teacherId: req.user.userId, 
        status: 'PENDING',
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        rotationDuration: parseInt(rotationDuration)
      }
    });

    res.status(201).json({ message: 'Content uploaded, waiting for approval', content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const approveContent = async (req, res) => {
  const { status, rejectionReason } = req.body; 
  
  try {
    const content = await prisma.content.update({
      where: { id: req.params.id },
      data: {
        status,
        rejectionReason: status === 'REJECTED' ? rejectionReason : null,
        approvedById: req.user.userId
      }
    });
    res.json({ message: `Content ${status.toLowerCase()} successfully`, content });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};


const getLiveContent = async (req, res) => {
  const { teacherId } = req.params;
  const { subject } = req.query; // Capture subject from query string: ?subject=Physics
  const now = new Date();

  try {
    const whereClause = {
      teacherId: teacherId,
      status: 'APPROVED',
      startTime: { lte: now },
      endTime: { gte: now }
    };

    if (subject) {
      whereClause.subject = subject;
    }

    const activeContent = await prisma.content.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });
    res.json({
      count: activeContent.length,
      items: activeContent.map(item => ({
        ...item,
        fileUrl: item.fileUrl.replace(/\\/g, '/')
      }))
    });

  } catch (error) {
    res.status(500).json({ error: "Broadcasting service currently offline" });
  }
};

module.exports = { uploadContent, approveContent, getLiveContent };