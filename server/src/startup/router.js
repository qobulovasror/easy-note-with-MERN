import Express from "express";

import {customErrorMiddleware, customMiddleware} from '../middleware/errorHandler.js'
import home from '../routes/home.js'
import user from '../routes/user.js'
// import note from '../routes/note.js'

export default async function(app){
    //default middleware
    app.use(Express.json())
    app.use(Express.urlencoded({extended: true}))

    //custom middleware
    app.use(customMiddleware)
    
    //routes
    app.use("/", home);
    app.use("/api/home", user);
    // app.use("/api/note", note);

    //custom error middleware
    app.use(customErrorMiddleware)
}