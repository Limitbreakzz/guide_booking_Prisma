const express = require('express');
const app = express.Router();
const controller = require('../controllers/guide.controller');

app.get('/',
    // #swagger.tags = ['Guides']
    // #swagger.description = 'ดึงข้อมูลไกด์ทั้งหมด'
    controller.getGuides
);

app.get('/:id',
    // #swagger.tags = ['Guides']
    // #swagger.description = 'ดึงข้อมูลไกด์ตาม ID'
    controller.getGuideById
);

app.post('/',
    // #swagger.tags = ['Guides']
    // #swagger.description = 'เพิ่มข้อมูลไกด์ใหม่'
    controller.createGuide
);

app.put('/:id',
    // #swagger.tags = ['Guides']
    // #swagger.description = 'แก้ไขข้อมูลไกด์'
    controller.updateGuide
);

app.delete('/:id',
    // #swagger.tags = ['Guides']
    // #swagger.description = 'ลบข้อมูลไกด์'
    controller.deleteGuide
);

module.exports = app;
