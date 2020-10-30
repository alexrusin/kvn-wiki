import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'
import signInWithToken from '../../../utils/signInWithToken'
import signInWithCookie from '../../../utils/signInWithCookie'

export default async function handler (req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const user = new User(req.body)
        await user.save()

        if (req.headers.accept === 'application/json') {
          res.status(201).json(await signInWithToken(user))
        } else {
          res.status(201).json(signInWithCookie(req, res, user))
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
