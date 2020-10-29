import dbConnect from '../utils/dbConnect'
import decrypt from '../utils/decrypt'
import User from '../models/User'
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'

const getAuthUser = async (req, res) => {
  await dbConnect()

  let user
  let token

  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.APP_KEY)
    user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    })
  } else {
    const cookies = new Cookies(req, res)
    const toDecrypt = cookies.get('ikdb')
    if (!toDecrypt) {
      throw new Error()
    }
    const id = decrypt(toDecrypt)
    user = await User.findOne({
      _id: id
    })
  }

  if (!user) {
    throw new Error()
  }

  req.user = user
  req.token = token
}

export default getAuthUser
