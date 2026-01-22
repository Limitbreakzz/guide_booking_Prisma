const prisma = require("../prisma.js");

exports.getTourists = async (req, res) => {
  try {
    const tourists = await prisma.tourist.findMany({
      where: { role: "tourist" },
    });

    res.json({
      status: "success",
      message: "Tourists retrieved successfully",
      data: tourists,
    });
  } catch (error) {
    console.error("Error fetching tourists:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getTouristById = async (req, res) => {
  try {
    const tourist = await prisma.tourist.findFirst({
      where: {
        id: Number(req.params.id),
        role: "tourist",
      },
    });

    if (!tourist) {
      return res.status(404).json({
        status: "error",
        message: "Tourist not found",
      });
    }

    res.json({
      status: "success",
      message: "Tourist retrieved successfully",
      data: tourist,
    });
  } catch (error) {
    console.error("Error fetching tourist:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.createTourist = async (req, res) => {
  try {
    const { name, email, password, tel, images } = req.body;

    const existing = await prisma.tourist.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }

    const tourist = await prisma.tourist.create({
      data: {
        name,
        email,
        password,
        tel,
        images,
        role: "tourist",
      },
    });

    res.status(201).json({
      status: "success",
      message: "Tourist created successfully",
      data: tourist,
    });
  } catch (error) {
    console.error("Error creating tourist:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.updateTourist = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid tourist id",
      });
    }

    if (req.body.role !== undefined) {
      return res.status(400).json({
        status: "error",
        message: "Role cannot be updated",
      });
    }

    const updated = await prisma.tourist.update({
      where: { id },
      data: req.body,
    });

    res.json({
      status: "success",
      message: "Tourist updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error("Error updating tourist:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        status: "error",
        message: "Tourist not found",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};


exports.deleteTourist = async (req, res) => {
  try {
    await prisma.tourist.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({
      status: "success",
      message: "Tourist deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tourist:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        status: "error",
        message: "Tourist not found",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
