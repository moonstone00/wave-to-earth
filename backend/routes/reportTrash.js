const express = require('express')
const ReportTrashModel = require('../models/reportTrash')
const router = express.Router()

router.get('/', async(req, res) => {
    const reportTrash = await ReportTrashModel.findAll()

    res.status(200).json({
        data: reportTrash,
        metadata: 'Test User Endpoint'
    })
})

// api untuk menambahkan data report trash
router.post('/', async(req, res) => {
    const { name, location, date } = req.body

    try{
        const reportTrash = await ReportTrashModel.create({
            name, location, date
        })
        res.status(200).json({
            data: reportTrash,
            metadata: 'Post Report Endpoint'
        })
    } catch(error) {
        res.status(400).json({
            error: error
        })
    }
})

module.exports = router