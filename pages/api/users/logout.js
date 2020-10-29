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
        if (req.token) {
          req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
          })
          await req.user.save()
        } else {
          setCookie(req, res, 'ikdb', 'expired', -1)
        }

        return res.json({ message: 'logged out' })
      } catch (e) {
        return res.status(500).send()
      }
      break
    default:
      res.status(404).json({ error: 'Route not found' })
      break
  }
}
