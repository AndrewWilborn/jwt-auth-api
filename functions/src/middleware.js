import jwt from 'jsonwebtoken'
import { privateKey } from '../creds.js'

export async function validToken(req, res, next) {
  if(!req.headers || !req.headers.authorization) {
    res.status(401).send({ message: "No Authorization Token", success: false })
    return
  }
  try {
    const decodedToken = jwt.verify(req.headers.authorization, privateKey)
    req.decodedToken = decodedToken
    next()
  } catch(err) {
    res.status(401).send({ message: "Invalid Auth Token", success: false })
  }

}

export async function matchingUser(req, res, next) {
  if(req.decodedToken._id !== req.params.uid) {
    res.status(401).send({ message: "Unauthorized User", success: false })
    return
  }
  next()
}