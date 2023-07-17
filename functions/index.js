import express from 'express'
import cors from 'cors'
import { onRequest } from 'firebase-functions/v2/https'
import { signup, login, getProfile } from './src/users.js'

const app = express()

app.use(cors()) // Allows access from other domains
app.use(express.json())

// routes:
app.post("/signup", signup)
app.post("/login", login)

// // protected routes:
app.get("/profile", getProfile)
// app.patch("/profile")

export const api = onRequest(app)