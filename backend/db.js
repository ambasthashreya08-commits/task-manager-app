const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("Missing MONGO_URI");

let cached = global.mongoose;
app.use(
  cors({
    origin: "*",
  })
);

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB= async ()=>{
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    }).then((m) => {
      console.log("🔥 Mongo connected (cached)");
      return m;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports= connectDB;