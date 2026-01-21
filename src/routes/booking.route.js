const express = require('express');
const app = express.Router();
const controller = require('../controllers/booking.controller');

app.get('/',
    // #swagger.tags = ['Booking']
    // #swagger.description = 'ดึงรายการจองทั้งหมด'
    controller.getBookings
);

app.get('/:id',
    // #swagger.tags = ['Booking']
    // #swagger.description = 'ดึงข้อมูลการจองตาม ID'
    controller.getBookingById
);

app.post('/',
    // #swagger.tags = ['Booking']
    // #swagger.description = 'สร้างรายการจองใหม่'
    controller.createBooking
);

app.put('/:id',
    // #swagger.tags = ['Booking']
    // #swagger.description = 'แก้ไขข้อมูลการจอง'
    controller.updateBooking
);

app.delete('/:id',
    // #swagger.tags = ['Booking']
    // #swagger.description = 'ลบข้อมูลการจอง'
    controller.deleteBooking
);

module.exports = app;
