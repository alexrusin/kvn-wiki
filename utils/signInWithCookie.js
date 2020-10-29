import setCookie from './setCookie'

export default function (req, res, user) {
  setCookie(req, res, 'ikdb', user._id, 365)
  return { user }
}
