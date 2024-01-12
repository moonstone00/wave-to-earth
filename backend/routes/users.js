const express = require('express')
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
// const passwordCheck = require('../utils/confirmPasswordCheck')
const loginCheck = require('../utils/loginCheck')
const router = express.Router()

router.get('/', async(req, res) => {
    const users = await UsersModel.findAll()

    res.status(200).json({
        data: users,
        metadata: "test user endpoint"
    })
})

// api for register
router.post('/', async(req, res) => {

    const { userName, email, password } = req.body
    const encryptedPassword = await bcrypt.hash(password, 10)
    // const confirmencryptedPassword = await bcrypt.hash(confirmPassword, 10)

    // const check = await loginCheck(email, password)

    try {
        
        const users = await UsersModel.create({
            userName, email, password: encryptedPassword
        })
        res.status(200).json({
            users: users,
            metadata: 'post user endpoint'
        })
        
    } catch(error) {
        res.status(400).json({
            error: 'Data Invalid'
        })
    }
})

// api for login
router.post('/login', async(req, res) => {
    const { email, password } = req.body
    try {
        const check = await loginCheck(email, password)
        if(check.compare === true) {
            res.status(200).json({
                users: check.userData,
                metadata: 'login success'
            })
        }
    } catch(error) {
        res.status(400).json({
            error: 'Data Invalid'
        })
    }
})

module.exports = router