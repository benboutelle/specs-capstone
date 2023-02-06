const {User}= require('../models/user')
require('dotenv').config()
const {SECRET}=process.env
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createToken = (username, id) => {
    return jwt.sign({username, id}, SECRET,{expiresIn: '2 days'})
}

module.exports={
    register: async (req, res) => {
        console.log('register')
        try{
            const {username, password}= req.body
            let foundUser = await User.findOne({where:{username}})

            if(foundUser){
                res.status(400).send('That username is taken, please try a different one')
            }else{
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const newUser = await User.create({
                    username,
                    password: hash
                })
                const token = createToken(newUser.username, newUser.id)
                const exp = Date.now() + 1000 * 60 * 60 * 48 
                res.status(200).send({
                    username: newUser.username,
                    userId: newUser.id,
                    token,
                    exp
                })
            }
        } catch(err) {
            console.log(err)
            res.sendStatus(200)
        }
    },
    login: async (req, res)=>{
        console.log('login')
        try {
            const { username, password}= req.body
            let foundUser = await User.findOne({where: {username}})
            if(foundUser) {
                const isAuthenticated = bcrypt.compareSync(
                    password,
                    foundUser.dataValues.password
                )
                if (isAuthenticated) {
                    const token = createToken(
                        foundUser.dataValues.username,
                        foundUser.dataValues.id
                    )
                    const exp = Date.now() + 1000 * 60 * 60 * 48
                    return res.status(200).send({
                        username: foundUser.dataValues.username,
                        userId: foundUser.dataValues.id,
                        token,
                        exp
                    })
                } else {
                    return res.status(400).send('wrong password')
                } 
            } else {
                return res.status(400).send('wrong username')
            }
        } catch (err) {
            console.log('error in login')
            console.log(err)
            return res.sendStatus(400)
        }
    }
}
