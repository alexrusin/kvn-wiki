export default async function (user) {
  const token = await user.generateAuthToken()
  user.tokens = user.tokens.concat({ token })
  await user.save()

  return { user, token }
}
