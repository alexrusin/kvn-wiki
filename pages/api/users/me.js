import nextConnect from 'next-connect'
import auth from '../../../middleware/auth'

const handler = nextConnect();

handler.use(auth)
    .get((req, res) => {
        res.send(req.user)
    })

export default handler