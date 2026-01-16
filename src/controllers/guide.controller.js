const prisma = require("../prisma.js");

exports.getGuides = async (req, res) => {
  try {
    const guides = await prisma.user.findMany({
      where: { role: "GUIDE" },
      include: {
        guideProfile: true,
      },
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
    const guide = await prisma.user.findFirst({
      where: { id, role: "GUIDE" },
      include: { guideProfile: true },
    });

    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
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

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const guide = await prisma.user.create({
      data: {
        name,
        email,
        password,
        tel,
        role: "GUIDE",
        guideProfile: {
          create: {
            experience,
            language,
            images,
          },
        },
      },
      include: { guideProfile: true },
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
  const id = Number(req.params.id);
  const { experience, language, images, tel } = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(tel && { tel }),
        guideProfile: {
          update: {
            ...(experience && { experience }),
            ...(language && { language }),
            ...(images && { images }),
          },
        },
      },
      include: { guideProfile: true },
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
  const id = Number(req.params.id);

  try {
    await prisma.guide.delete({ where: { userId: id } });
    await prisma.user.delete({ where: { id } });

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
