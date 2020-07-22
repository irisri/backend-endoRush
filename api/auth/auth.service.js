const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(userName, password) {
    console.log('login-authser', 'userName', userName, 'password', password);
    // logger.debug(`auth.service - login with userName: ${userName}`)
    if (!userName || !password) return Promise.reject('username and password are required!')
    const user = await userService.getByUserName(userName)
    if (!user) return Promise.reject('Invalid username')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid password')
    delete user.password;
    delete user.reviews;
    delete user.fullName;
    delete user.bio;
    return user;
}

async function signup(fullName, password, userName) {
    // logger.debug(`auth.service - signup with email: ${fullName}, username: ${userName}`)
    if (!fullName || !password || !userName) return Promise.reject('fullName, username and password are required!')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({fullName, password: hash, userName})
}

module.exports = {
    signup,
    login,
}