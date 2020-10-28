/* eslint-disable no-unreachable */
import getAuthUser from '../../../middleware/getAuthUser'
import setCookie from '../../../utils/setCookie'

export default async function handler (req, res) {
  const { method } = req

  try {
    await getAuthUser(req, res)
  } catch (err) {
    return res.status(401).send({
      error: 'Please authenticate'
    })
  }

  switch (method) {
    case 'POST':
      try {
        req.user.tokens = req.user.tokens.filter((token) => {
          return token.token !== req.token
        })
        await req.user.save()

        setCookie(req, res, 'ikdb', 'expired', -1)
        return res.json({ message: 'logged out' })
      } catch (e) {
        return res.status(500).send()
      }
      break
    default:
      res.status(400).json({ message: 'Route not found' })
      break
  }
}
