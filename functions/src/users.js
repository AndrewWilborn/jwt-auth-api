import jwt from 'jsonwebtoken'
import { hash } from 'bcrypt'
import { ObjectId } from 'mongodb'
import { db } from './dbConnect.js'
import { privateKey, salt } from '../creds.js'

const coll = db.collection('users')

export async function signup(req, res) {
  const { email, password } = req.body
  const hashedPassword = await hash(password, salt)
  await coll.insertOne({ email: email.toLowerCase(), password: hashedPassword })
  login(req, res)
}

export async function login(req, res) {
  const { email, password} = req.body
  const hashedPassword = await hash(password, salt)
  let user = await coll.findOne({ email: email.toLowerCase(), password: hashedPassword })
  if(!user) {
    res.status(401).send({ message: "Invalid email or password."})
    return
  }
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