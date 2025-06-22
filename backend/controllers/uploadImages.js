const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");
const upload = require("../middleware/uploadMiddleware");

const uploadResumeImages = async (req, res) => {
    try {
        upload.fields([
            { name: 'thumbnail', maxCount: 1 }, 
            { name: 'profileImage', maxCount: 1 }
        ])(req, res, async (err) => {
            if (err) {
                console.error('Upload middleware error:', err);
                return res.status(400).json({
                    message: "File upload failed", 
                    error: err.message
                });
            }

            const resumeId = req.params.id;
            
            // Validate resume ID format
            if (!resumeId || !resumeId.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({
                    message: "Invalid resume ID format"
                });
            }

            const resume = await Resume.findOne({
                _id: resumeId, 
                userId: req.user._id
            });

            if (!resume) {
                return res.status(404).json({
                    message: "Resume not found or unauthorized"
                });
            }

            const uploadsFolder = path.join(__dirname, "..", 'uploads');
            
            // Ensure uploads folder exists
            if (!fs.existsSync(uploadsFolder)) {
                fs.mkdirSync(uploadsFolder, { recursive: true });
            }

            // Determine base URL based on environment
            let baseUrl;
            if (process.env.NODE_ENV === 'production') {
                // Use the deployed backend URL
                baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;
            } else {
                baseUrl = `${req.protocol}://${req.get("host")}`;
            }

            const newThumbnail = req.files?.thumbnail?.[0];
            const newProfileImage = req.files?.profileImage?.[0];

            // Handle thumbnail upload
            if (newThumbnail) {
                // Remove old thumbnail if exists
                if (resume.thumbnailLink) {
                    try {
                        const oldThumbnailPath = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
                        if (fs.existsSync(oldThumbnailPath)) {
                            fs.unlinkSync(oldThumbnailPath);
                        }
                    } catch (deleteErr) {
                        console.warn('Failed to delete old thumbnail:', deleteErr);
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

                // Remove old profile image if exists
                if (resume.profileInfo.profilePreviewUrl) {
                    try {
                        const oldProfilePath = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
                        if (fs.existsSync(oldProfilePath)) {
                            fs.unlinkSync(oldProfilePath);
                        }
                    } catch (deleteErr) {
                        console.warn('Failed to delete old profile image:', deleteErr);
                    }
                }
                
                resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
            }

            // Save the resume
            await resume.save();

            res.status(200).json({
                message: "Images uploaded successfully",
                data: {
                    thumbnailLink: resume.thumbnailLink,
                    profilePreviewUrl: resume.profileInfo?.profilePreviewUrl,
                    uploadedFiles: {
                        thumbnail: newThumbnail ? newThumbnail.filename : null,
                        profileImage: newProfileImage ? newProfileImage.filename : null
                    }
                }
            });
        });
    } catch (err) {
        console.error("Error uploading images:", err);
        res.status(500).json({
            message: "Failed to upload images", 
            error: err.message
        });
    }
};

module.exports = { uploadResumeImages };