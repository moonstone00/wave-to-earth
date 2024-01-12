const bcrypt = require('bcrypt')
const UsersModel = require('../models/users')

const loginCheck = async(email, password) => {
    const userData = await UsersModel.findOne({where: {email: email}})
    const compare = await bcrypt.compare(password, userData.password)
    return { userData, compare }
}

module.exports = loginCheck