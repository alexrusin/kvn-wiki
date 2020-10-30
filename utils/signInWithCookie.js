import setCookie from './setCookie'

export default function (req, res, user) {
  setCookie(req, res, 'ikdb', user.id.toString(), 365)
  return { user }
}
