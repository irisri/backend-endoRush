const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(userName, password) {
    logger.debug(`auth.service - login with userName: ${userName}`)
    if (!userName || !password) return Promise.reject('username and password are required!')

    const user = await userService.getByUserName(userName)
    console.log('user-authserv', user);
    if (!user) return Promise.reject('Invalid username or password')
    console.log('password', password);
    console.log(' user.password',  user.password);
    const match = await bcrypt.compare(password, user.password)
    // const match = await bcrypt.compare('1111', user.password)
    console.log('match', match);
    if (!match) return Promise.reject('Invalid username or password')
    delete user.password;
    console.log('user', user);
    return user;
}

async function signup(email, password, username) {
    logger.debug(`auth.service - signup with email: ${email}, username: ${username}`)
    if (!email || !password || !username) return Promise.reject('email, username and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({email, password: hash, username})
}

module.exports = {
    signup,
    login,
}