const express = require('express');
const app = express.Router();
const controller = require('../controllers/tourist.controller');

app.get('/',
    // #swagger.tags = ['Tourist']
    // #swagger.description = 'ดึงข้อมูลนักท่องเที่ยวทั้งหมด'
    controller.getTourists
);

app.get('/:id',
    // #swagger.tags = ['Tourist']
    // #swagger.description = 'ดึงข้อมูลนักท่องเที่ยวตาม ID'
    controller.getTouristById
);

app.post('/',
    // #swagger.tags = ['Tourist']
    // #swagger.description = 'เพิ่มข้อมูลนักท่องเที่ยวใหม่'
    controller.createTourist
);

app.put('/:id',
    // #swagger.tags = ['Tourist']
    // #swagger.description = 'แก้ไขข้อมูลนักท่องเที่ยว'
    controller.updateTourist
);

app.delete('/:id',
    // #swagger.tags = ['Tourist']
    // #swagger.description = 'ลบข้อมูลนักท่องเที่ยว'
    controller.deleteTourist
);

module.exports = app;
