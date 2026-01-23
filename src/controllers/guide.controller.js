const prisma = require("../prisma.js");

exports.getGuides = async (req, res) => {
  try {
    const guides = await prisma.guide.findMany({
      where: { role: "GUIDE" },
    });

    res.json({
      status: "success",
      message: "Guides retrieved successfully",
      data: guides,
    });
  } catch (error) {
    console.error("Error fetching guides:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getGuideById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const guide = await prisma.guide.findFirst({
      where: { id, role: "GUIDE" },
    });

    if (!guide) {
      return res.status(404).json({ 
        message: "Guide not found" 
      });
    }

    res.json({
      status: "success",
      message: "Guide retrieved successfully",
      data: guide,
    });
  } catch (error) {
    console.error("Error fetching guide:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.createGuide = async (req, res) => {
  try {
    const { name, email, password, tel, experience, language, images } = req.body;

    const exists = await prisma.guide.findUnique({ where: { email } });

    if (exists) {
      return res.status(400).json({ 
        message: "Email already exists" 
      });
    }

    const guide = await prisma.guide.create({
      data: {
        name,
        email,
        password,
        tel,
        role: "GUIDE",
        status: true,
        experience,
        language,
        images,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Guide created successfully",
      data: guide,
    });
  } catch (error) {
    console.error("Error creating guide:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.updateGuide = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid guide id",
      });
    }

    if (req.body.role !== undefined) {
      return res.status(400).json({
        status: "error",
        message: "Role cannot be updated",
      });
    }
    const { name, email, password, tel, experience, language, images, status } = req.body;

    const updated = await prisma.guide.update({
      where: { id },
      data: {
        name,
        email,
        password,
        tel,
        experience,
        language,
        images,
        status: typeof status === "boolean" ? status : undefined,
      },
    });

    res.json({
      status: "success",
      message: "Guide updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error("Error updating guide:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        status: "error",
        message: "Guide not found",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.deleteGuide = async (req, res) => {
  try {
    await prisma.guide.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({
      status: "success",
      message: "Guide deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting guide:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        status: "error",
        message: "Guide not found",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
