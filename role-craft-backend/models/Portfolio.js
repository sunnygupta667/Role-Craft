
import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9-]+$/,
        "Slug can only contain lowercase letters, numbers, and hyphens",
      ],
    },
    jobRole: {
      type: String,
      required: [true, "Job role is required"],
      trim: true,
    },
    theme: {
      type: String,
      enum: ["dark", "light"],
      default: "dark",
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    hero: {
      name: { type: String, required: true },
      title: { type: String, required: true },
      subtitle: String,
      description: String,
      profileImage: String,
      ctaText: { type: String, default: "Get In Touch" },
      ctaLink: String,
    },
    skills: [
      {
        category: { type: String, required: true },
        items: [
          {
            name: { type: String, required: true },
            level: { type: Number, min: 0, max: 100, default: 80 }
          },
        ],
      },
    ],
    projects: [
      {
        title: { type: String, required: true },
        description: String,
        technologies: [String],
        image: String,
        liveUrl: String,
        githubUrl: String,
        featured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
      },
    ],
    experience: [
      {
        company: { type: String, required: true },
        position: { type: String, required: true },
        duration: { type: String, required: true },
        location: String,
        description: String,
        responsibilities: [String],
        startDate: Date,
        endDate: Date,
        current: { type: Boolean, default: false },
      },
    ],
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        field: String,
        duration: String,
        location: String,
        grade: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    // ✅ NEW SECTION: CERTIFICATES
    certificates: [
      {
        title: { type: String, required: true },
        issuer: { type: String, required: true },
        date: String,
        url: String, // Credential URL
        image: String, // Certificate Image/Logo
      },
    ],
    contact: {
      email: { type: String, required: true },
      phone: String,
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
      },
      social: {
        linkedin: String,
        github: String,
        twitter: String,
        website: String,
      },
    },
    resume: {
      url: String,
      publicId: String,
      filename: String,
      uploadedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
portfolioSchema.index({ slug: 1 });
portfolioSchema.index({ isEnabled: 1 });

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;