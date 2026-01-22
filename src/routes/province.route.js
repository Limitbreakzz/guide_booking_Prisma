const express = require('express');
const app = express.Router();
const controller = require('../controllers/province.controller');

app.get('/',
    // #swagger.tags = ['Provinces']
    // #swagger.description = 'ดึงข้อมูลจังหวัดทั้งหมด'
    controller.getProvinces
);

app.get('/:id',
    // #swagger.tags = ['Provinces']
    // #swagger.description = 'ดึงข้อมูลจังหวัดตาม ID'
    controller.getProvinceById
);

app.post('/',
    // #swagger.tags = ['Provinces']
    // #swagger.description = 'เพิ่มข้อมูลจังหวัดใหม่'
    controller.createProvince
);

app.put('/:id',
    // #swagger.tags = ['Provinces']
    // #swagger.description = 'แก้ไขข้อมูลจังหวัด'
    controller.updateProvince
);

app.delete('/:id',
    // #swagger.tags = ['Provinces']
    // #swagger.description = 'ลบข้อมูลจังหวัด'
    controller.deleteProvince
);

module.exports = app;
