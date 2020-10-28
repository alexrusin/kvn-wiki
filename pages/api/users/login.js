import dbConnect from '../../../utils/dbConnect'
import encrypt from '../../../utils/encrypt'
import User from '../../../models/User'
import Cookies from 'cookies'

export default async function handler (req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (req.headers('Accept') === 'application/json') {
          const token = await user.generateAuthToken()
          user.tokens = user.tokens.concat({ token })
          await user.save()
          res.status(200).json({ user, token })
        } else {
          const cookies = new Cookies(req, res)
          cookies.set('ikdb', encrypt(user._id), {
            httpOnly: true
          })
          res.status(200).json(user)
        }
      } catch (e) {
        console.log(e)
        res.status(400).send(e)
      }
      break
    default:
      res.status(400).json({ message: 'Route not found' })
      break
  }
}
