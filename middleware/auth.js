import dbConnect from '../utils/dbConnect'
import decrypt from '../utils/decrypt'
import User from '../models/User'
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    await dbConnect()
    try{
        const cookies = new Cookies(req, res)
        const toDecrypt = cookies.get('ikdb');
        if (!toDecrypt) {
            throw new Error();
        }
        const token = decrypt(toDecrypt)
        const decoded = jwt.verify(token, process.env.APP_KEY)
        const user = await User.findOne({
            _id: decoded._id, 
            'tokens.token': token
        })
        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token

        next();
       
    } catch (e) {
        res.status(401).send({
            error: 'Please authenticate'
        })
    }
}

export default auth