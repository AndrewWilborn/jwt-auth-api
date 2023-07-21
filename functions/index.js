import express from 'express'
import cors from 'cors'
import { onRequest } from 'firebase-functions/v2/https'
import { matchingUser, validToken } from './src/middleware.js'
import { signup, login, getProfile, updateProfile } from './src/users.js'

const app = express()

app.use(cors()) // Allows access from other domains
app.use(express.json())

// routes:
app.post("/signup", signup)
app.post("/login", login)

// // protected routes:
app.get("/profile", validToken, getProfile)
app.patch("/profile", validToken, matchingUser, updateProfile)

export const api = onRequest(app)