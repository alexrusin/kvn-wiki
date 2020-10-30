import crypto from 'crypto'

export default function (toDecrypt) {
  const decipher = crypto.createDecipher('aes-128-cbc', process.env.APP_KEY)
  let decrypted = decipher.update(toDecrypt, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
