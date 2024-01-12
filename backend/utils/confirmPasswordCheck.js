const bcrypt = require('bcrypt')
const UsersModel = require('../models/users')

const passwordCheck = async (userName, password, confirmPassword) => {
    const userData = await UsersModel.findOne({where:{userName: userName}})
    const compare = await bcrypt.compare(password, confirmPassword)
    return { compare, userData }
}

module.exports = passwordCheck