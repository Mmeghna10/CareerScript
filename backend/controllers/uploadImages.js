const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");
const upload = require("../middleware/uploadMiddleware");

// Define the multer middleware for handling multiple files
const uploadResumeImagesMiddleware = upload.fields([
    { name: 'thumbnail', maxCount: 1 }, 
    { name: 'profileImage', maxCount: 1 }
]);

const uploadResumeImages = async (req, res) => {
    try {
        const resumeId = req.params.id;
        
        // Validate resumeId
        if (!resumeId) {
            return res.status(400).json({ message: "Resume ID is required" });
        }

        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        console.log('Upload request received:', {
            resumeId,
            userId: req.user._id,
            files: req.files
        });

        // Find the resume
        const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found or unauthorized" });
        }

        const uploadsFolder = path.join(__dirname, "..", 'uploads');
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        // Ensure uploads directory exists
        if (!fs.existsSync(uploadsFolder)) {
            fs.mkdirSync(uploadsFolder, { recursive: true });
        }

        const newThumbnail = req.files?.thumbnail?.[0];
        const newProfileImage = req.files?.profileImage?.[0];

        console.log('Processing files:', {
            thumbnail: newThumbnail ? newThumbnail.filename : 'none',
            profileImage: newProfileImage ? newProfileImage.filename : 'none'
        });

        // Validate that at least one file was uploaded
        if (!newThumbnail && !newProfileImage) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Handle thumbnail upload
        if (newThumbnail) {
            // Remove old thumbnail if it exists
            if (resume.thumbnailLink) {
                const oldThumbnailPath = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
                if (fs.existsSync(oldThumbnailPath)) {
                    try {
                        fs.unlinkSync(oldThumbnailPath);
                        console.log('Old thumbnail deleted:', oldThumbnailPath);
                    } catch (err) {
                        console.error('Error deleting old thumbnail:', err);
                    }
                }
            }
            resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
        }

        // Handle profile image upload
        if (newProfileImage) {
            // Initialize profileInfo if it doesn't exist
            if (!resume.profileInfo) {
                resume.profileInfo = {};
            }

            // Remove old profile image if it exists
            if (resume.profileInfo.profilePreviewUrl) {
                const oldProfilePath = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
                if (fs.existsSync(oldProfilePath)) {
                    try {
                        fs.unlinkSync(oldProfilePath);
                        console.log('Old profile image deleted:', oldProfilePath);
                    } catch (err) {
                        console.error('Error deleting old profile image:', err);
                    }
                }
            }
            resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }

        // Save the updated resume
        await resume.save();

        console.log('Images uploaded successfully for resume:', resumeId);

        res.status(200).json({
            message: "Images uploaded successfully",
            thumbnailLink: resume.thumbnailLink,
            profilePreviewUrl: resume.profileInfo?.profilePreviewUrl,
            uploadedFiles: {
                thumbnail: newThumbnail ? newThumbnail.filename : null,
                profileImage: newProfileImage ? newProfileImage.filename : null
            }
        });

    } catch (err) {
        console.error("Error uploading images:", err);
        
        // Clean up uploaded files if database save fails
        if (req.files) {
            const allFiles = [...(req.files.thumbnail || []), ...(req.files.profileImage || [])];
            allFiles.forEach(file => {
                try {
                    const filePath = path.join(__dirname, "..", 'uploads', file.filename);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                } catch (cleanupErr) {
                    console.error('Error cleaning up file:', cleanupErr);
                }
            });
        }

        res.status(500).json({ 
            message: "Failed to upload images", 
            error: err.message 
        });
    }
};

module.exports = { 
    uploadResumeImages,
    uploadResumeImagesMiddleware 
};