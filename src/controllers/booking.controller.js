const prisma = require("../prisma.js");

exports.getBookings = async (req, res) => {
  try {
    const { touristId, guideId } = req.query;
    const where = {};

    if (touristId) where.touristId = Number(touristId);
    if (guideId) where.guideId = Number(guideId);

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        trip: true,
        province: true,
        tourist: { select: { id: true, name: true , tel: true } },
        guide: { select: { id: true, name: true , experience: true, language: true, tel: true} },
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({
      status: "success",
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        trip: true,
        province: true,
        tourist: { select: { id: true, name: true } },
        guide: { select: { id: true, name: true } },
      }
    });

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found",
      });
    }

    res.json({
      status: "success",
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { tripId, datetime, touristId } = req.body;

    const trip = await prisma.trip.findUnique({
      where: { id: Number(tripId) }
    });

    if (!trip) {
      return res.status(404).json({
        status: "error",
        message: "Trip not found",
      });
    }

    if (!touristId) {
        return res.status(400).json({
          message: "touristId is required" 
        });
    }

    const booking = await prisma.booking.create({
      data: {
        tripId: trip.id,
        touristId: Number(touristId),
        guideId: trip.guideId,
        provinceId: trip.provinceId,
        datetime: new Date(datetime),
        status: "pending",
      },
      include: { 
        tourist: true, 
        guide : true,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { datetime, status } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found",
      });
    }

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        datetime: datetime ? new Date(datetime) : undefined,
        status: status || undefined,
      },
      include: { tourist: true },
    });

    res.json({
      status: "success",
      message: "Booking updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found",
      });
    }

    await prisma.booking.delete({
      where: { id: booking.id }
    });

    res.json({
      status: "success",
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
