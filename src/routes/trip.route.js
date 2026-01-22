const express = require('express');
const app = express.Router();
const controller = require('../controllers/trip.controller');

app.get('/',
    // #swagger.tags = ['Trips']
    // #swagger.description = 'ดึงข้อมูลทริปทั้งหมด'
    controller.getTrips
);

app.get('/:id',
    // #swagger.tags = ['Trips']
    // #swagger.description = 'ดึงข้อมูลทริปตาม ID'
    controller.getTripById
);

app.post('/',
    // #swagger.tags = ['Trips']
    // #swagger.description = 'เพิ่มข้อมูลทริปใหม่'
    controller.createTrip
);

app.put('/:id',
    // #swagger.tags = ['Trips']
    // #swagger.description = 'แก้ไขข้อมูลทริป'
    controller.updateTrip
);

app.delete('/:id',
    // #swagger.tags = ['Trips']
    // #swagger.description = 'ลบข้อมูลทริป'
    controller.deleteTrip
);

module.exports = app;
