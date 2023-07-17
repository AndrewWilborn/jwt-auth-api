import { db } from './dbConnect.js'

const coll = db.collection('users')

export async function signup(req, res) {
  const { email, password } = req.body
  // TODO: hash passwords, check if email already exists, and add validation for email/password
  await coll.insertOne({ email: email.toLowerCase(), password })
  login(req, res)
}

export async function login(req, res) {
  const { email, password} = req.body
  let user = await coll.findOne({ email: email.toLowerCase(), password })
  delete user.password // strip out password
  // TODO: create token and send with user below
  res.send({ user })
}