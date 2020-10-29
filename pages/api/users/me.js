import getAuthUser from '../../../middleware/getAuthUser'

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
    case 'GET':
      res.send({ user: req.user })
      break
    default:
      res.status(404).json({ error: 'Route not found' })
      break
  }
}
