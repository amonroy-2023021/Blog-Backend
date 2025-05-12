"use strict"

import express from 'express'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import courseRoutes from "../src/curse/curse.routes.js"
import postRoutes from "../src/post/post.routes.js"
import commentRoutes from "../src/comments/comments.routes.js"
import { dbConnection } from './mongodb.js'

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      }));
      
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) => {
    app.use("/blog/v1/courses", courseRoutes);
    app.use("/blog/v1/posts", postRoutes);
    app.use("/blog/v1/comments", commentRoutes); 
}

const conectarDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port: ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}