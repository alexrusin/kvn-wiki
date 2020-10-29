import dbConnect from '../../../utils/dbConnect'
import signInWithToken from '../../../utils/signInWithToken'
import signInWithCookie from '../../../utils/signInWithCookie'
import User from '../../../models/User'

export default async function handler (req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (req.headers.accept === 'application/json') {
          res.status(200).json(await signInWithToken(user))
        } else {
          res.status(200).json(signInWithCookie(req, res, user))
        }
      } catch (e) {
        console.log(e)
        res.status(500).send(e)
      }
      break
    default:
      res.status(404).json({ error: 'Route not found' })
      break
  }
}
