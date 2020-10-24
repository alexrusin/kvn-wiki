import nextConnect from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import encrypt from '../../../utils/encrypt'
import User from '../../../models/User'
import Cookies from 'cookies'

const handler = nextConnect();

handler.post((req, res) => {
    dbConnect()
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

        res.status(400).send()
    }   
})

export default handler