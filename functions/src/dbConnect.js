import { MongoClient } from "mongodb";
import { mongoURI } from "../creds.js";

const connection = new MongoClient(mongoURI)

await connection.connect()

export const db = connection.db('Cluster0')