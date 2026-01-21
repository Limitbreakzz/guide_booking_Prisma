const prisma = require("../prisma.js");

exports.getTrips = async (req, res) => {
  try {
    const { provinceId } = req.query;

    const trips = await prisma.trip.findMany({where: provinceId ? { provinceId: Number(provinceId) } : {},
      include: {
        province: true,
        guide: { select: { id: true, name: true } }
      },
      orderBy: { name: "asc" }
    });

    res.json({
      status: "success",
      message: "Trips retrieved successfully",
      data: trips,
    });
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await prisma.trip.findUnique({ where: { id: Number(req.params.id) },
      include: {
        province: true,
        guide: { select: { id: true, name: true } }
      }
    });

    if (!trip) {
      return res.status(404).json({
        status: "error",
        message: "Trip not found",
      });
    }

    res.json({
      status: "success",
      message: "Trip retrieved successfully",
      data: trip,
    });
  } catch (error) {
    console.error("Error fetching trip:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.createTrip = async (req, res) => {
  try {
    const { name, provinceId, guideId, price } = req.body;

    const province = await prisma.province.findUnique({
      where: { id: Number(provinceId) }
    });

    if (!province) {
      return res.status(404).json({
        status: "error",
        message: "Province not found",
      });
    }

    const guide = await prisma.guide.findFirst({
      where: { id: Number(guideId), role: "guide" }
    });

    if (!guide) {
      return res.status(404).json({
        status: "error",
        message: "Guide not found",
      });
    }

    const trip = await prisma.trip.create({
      data: {
        name,
        provinceId: Number(provinceId),
        guideId: Number(guideId),
        price: price ? Number(price) : null,
      },
      include: { guide: true }
    });

    res.status(201).json({
      status: "success",
      message: "Trip created successfully",
      data: trip,
    });
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const { guideId, provinceId, price, ...data } = req.body;

    const updated = await prisma.trip.update({
      where: { id: Number(req.params.id) },
      data: {
        ...data,
        ...(price !== undefined ? { price: Number(price) } : {}),
        ...(guideId ? { guideId: Number(guideId) } : {}),
        ...(provinceId ? { provinceId: Number(provinceId) } : {}),
      },
      include: { guide: true },
    });

    res.json({
      status: "success",
      message: "Trip updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating trip:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        status: "error",
        message: "Trip not found",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    await prisma.trip.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({
      status: "success",
      message: "Trip deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting trip:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        status: "error",
        message: "Trip not found",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
