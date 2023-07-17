import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { db } from './dbConnect.js'
import { privateKey } from '../creds.js'

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
  const token = jwt.sign(user, privateKey)
  res.send({ user, token })
}

export async function getProfile(req, res) {
  if(!req.headers || !req.headers.authorization) {
    res.status(401).send({ message: "Not Authorized" })
    return
  }
  const decoded = jwt.verify(req.headers.authorization, privateKey)
  const user = await coll.findOne({ _id: new ObjectId(decoded._id)})
  res.send({ user })
}