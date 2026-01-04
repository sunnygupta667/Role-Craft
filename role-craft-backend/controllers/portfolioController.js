import Portfolio from "../models/Portfolio.js";
import cloudinary from "../config/cloudinary.js";

// @desc    Get all portfolios (admin)
// @route   GET /api/portfolios
// @access  Private
export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: portfolios.length,
      data: portfolios,
    });
  } catch (error) {
    console.error("Get all portfolios error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get portfolio by slug (public)
// @route   GET /api/portfolios/public/:slug
// @access  Public
export const getPortfolioBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const portfolio = await Portfolio.findOne({ slug, isEnabled: true });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    console.error("Get portfolio by slug error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get portfolio by ID (admin)
// @route   GET /api/portfolios/:id
// @access  Private
export const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    console.error("Get portfolio by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Create new portfolio
// @route   POST /api/portfolios
// @access  Private
export const createPortfolio = async (req, res) => {
  try {
    const portfolioData = req.body;

    // Check if slug already exists
    const existingPortfolio = await Portfolio.findOne({
      slug: portfolioData.slug,
    });

    if (existingPortfolio) {
      return res.status(400).json({
        success: false,
        message: "Portfolio with this slug already exists",
      });
    }

    const portfolio = await Portfolio.create(portfolioData);

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      data: portfolio,
    });
  } catch (error) {
    console.error("Create portfolio error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// @desc    Update portfolio
// @route   PUT /api/portfolios/:id
// @access  Private
export const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    // If slug is being updated, check if it already exists
    if (req.body.slug && req.body.slug !== portfolio.slug) {
      const existingPortfolio = await Portfolio.findOne({
        slug: req.body.slug,
      });
      if (existingPortfolio) {
        return res.status(400).json({
          success: false,
          message: "Portfolio with this slug already exists",
        });
      }
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      data: updatedPortfolio,
    });
  } catch (error) {
    console.error("Update portfolio error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// @desc    Delete portfolio
// @route   DELETE /api/portfolios/:id
// @access  Private
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    // Delete resume from cloudinary if exists
    if (portfolio.resume && portfolio.resume.publicId) {
      await cloudinary.uploader.destroy(portfolio.resume.publicId);
    }

    await Portfolio.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully",
    });
  } catch (error) {
    console.error("Delete portfolio error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Toggle portfolio status
// @route   PATCH /api/portfolios/:id/toggle
// @access  Private
export const togglePortfolioStatus = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    portfolio.isEnabled = !portfolio.isEnabled;
    await portfolio.save();

    res.status(200).json({
      success: true,
      message: `Portfolio ${
        portfolio.isEnabled ? "enabled" : "disabled"
      } successfully`,
      data: portfolio,
    });
  } catch (error) {
    console.error("Toggle portfolio status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
