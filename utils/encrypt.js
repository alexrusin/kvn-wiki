import crypto from 'crypto'

export default function (toEncrypt) {
    const cipher = crypto.createCipher('aes-128-cbc', process.env.APP_KEY)
    let encrypted = cipher.update(toEncrypt, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
}

