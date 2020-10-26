import nextConnect from 'next-connect'
import auth from '../../../middleware/auth'
import setCookie from '../../../utils/setCookie'

const handler = nextConnect();

handler.use(auth)
    .post(async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user.save()

            setCookie(req, res, 'ikdb', 'expired', -1);            
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    })

export default handler