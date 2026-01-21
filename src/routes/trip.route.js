const express = require('express');
const app = express.Router();
const controller = require('../controllers/trip.controller');

app.get('/',
    // #swagger.tags = ['Trip']
    // #swagger.description = 'ดึงข้อมูลทริปทั้งหมด'
    controller.getTrips
);

app.get('/:id',
    // #swagger.tags = ['Trip']
    // #swagger.description = 'ดึงข้อมูลทริปตาม ID'
    controller.getTripById
);

app.post('/',
    // #swagger.tags = ['Trip']
    // #swagger.description = 'เพิ่มข้อมูลทริปใหม่'
    controller.createTrip
);

app.put('/:id',
    // #swagger.tags = ['Trip']
    // #swagger.description = 'แก้ไขข้อมูลทริป'
    controller.updateTrip
);

app.delete('/:id',
    // #swagger.tags = ['Trip']
    // #swagger.description = 'ลบข้อมูลทริป'
    controller.deleteTrip
);

module.exports = app;
