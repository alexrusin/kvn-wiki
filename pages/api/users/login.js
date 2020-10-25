import dbConnect from '../../../utils/dbConnect'
import encrypt from '../../../utils/encrypt'
import User from '../../../models/User'
import Cookies from 'cookies'

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        user.tokens = user.tokens.concat({ token })
        await user.save()

        const cookies = new Cookies(req, res)
        cookies.set('ikdb', encrypt(token), {
            httpOnly: true,
        })

        res.status(200).json({ user, token });
      } catch (e) {
        console.log(e);
          res.status(400).send(e);
      }
      break
    default:
      res.status(400).json({ message: 'Route not found'})
      break
  }
}