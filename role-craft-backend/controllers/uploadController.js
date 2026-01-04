import Portfolio from "../models/Portfolio.js";
import cloudinary from "../config/cloudinary.js";

// Helper: Convert buffer to Base64 Data URI
const bufferToDataURI = (buffer, mimetype) => {
  const b64 = Buffer.from(buffer).toString("base64");
  return `data:${mimetype};base64,${b64}`;
};

// @desc    Upload resume
// @route   POST /api/upload/resume/:portfolioId
// @access  Private
export const uploadResume = async (req, res) => {
  try {
    const { portfolioId } = req.params;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload a file" });
    }

    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });
    }

    // 1. Convert file buffer to Base64 String
    const fileStr = bufferToDataURI(req.file.buffer, req.file.mimetype);

    // 2. Upload to Cloudinary using the string
    // resource_type: "auto" allows Cloudinary to detect PDF correctly for previews
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "portfolio-resumes",
      resource_type: "auto",
      use_filename: true,
      unique_filename: true,
    });

    // 3. Clean up old resume if it exists
    if (portfolio.resume && portfolio.resume.publicId) {
      try {
        await cloudinary.uploader.destroy(portfolio.resume.publicId);
      } catch (err) {
        console.error("Cleanup warning:", err.message);
      }
    }

    // 4. Save new resume data
    portfolio.resume = {
      url: result.secure_url,
      publicId: result.public_id,
      filename: req.file.originalname,
      uploadedAt: new Date(),
    };

    await portfolio.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      data: {
        url: result.secure_url,
        filename: req.file.originalname,
      },
    });
  } catch (error) {
    console.error("Upload resume error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during file upload" });
  }
};

// @desc    Upload image
// @route   POST /api/upload/image/:portfolioId
// @access  Private
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an image" });
    }

    // Convert image to Base64
    const fileStr = bufferToDataURI(req.file.buffer, req.file.mimetype);

    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "portfolio-images",
      resource_type: "image",
      transformation: [
        { width: 1200, height: 1200, crop: "limit" },
        { quality: "auto" },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: { url: result.secure_url, publicId: result.public_id },
    });
  } catch (error) {
    console.error("Upload image error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during image upload" });
  }
};
