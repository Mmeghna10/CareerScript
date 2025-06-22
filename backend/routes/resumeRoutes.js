const express = require("express");
const {
    createResume,
    getUserResume,
    getResumeById,
    updateResume,
    deleteResume,
} = require("../controllers/resumeController");
const { protect } = require("../middleware/authMiddleware");
const { uploadResumeImages, uploadResumeImagesMiddleware } = require("../controllers/uploadImages");

const router = express.Router();

router.post("/", protect, createResume);
router.get("/", protect, getUserResume);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);

// FIXED: Added the multer middleware before the controller
router.put("/:id/upload-images", 
    protect, // Authentication middleware
    uploadResumeImagesMiddleware, // Multer middleware for file handling
    uploadResumeImages // Controller function
);

router.delete("/:id", protect, deleteResume);

module.exports = router;