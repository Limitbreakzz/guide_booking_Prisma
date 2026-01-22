const express = require('express');
const app = express.Router();
const controller = require('../controllers/booking.controller');

app.get('/',
    // #swagger.tags = ['Bookings']
    // #swagger.description = 'ดึงรายการจองทั้งหมด'
    controller.getBookings
);

app.get('/:id',
    // #swagger.tags = ['Bookings']
    // #swagger.description = 'ดึงข้อมูลการจองตาม ID'
    controller.getBookingById
);

app.post('/',
    // #swagger.tags = ['Bookings']
    // #swagger.description = 'สร้างรายการจองใหม่'
    controller.createBooking
);

app.put('/:id',
    // #swagger.tags = ['Bookings']
    // #swagger.description = 'แก้ไขข้อมูลการจอง'
    controller.updateBooking
);

app.delete('/:id',
    // #swagger.tags = ['Bookings']
    // #swagger.description = 'ลบข้อมูลการจอง'
    controller.deleteBooking
);

module.exports = app;
