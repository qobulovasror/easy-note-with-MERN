//import packege from node_modules
import Express from "express";
import dotEnv from 'dotenv';

//import functions from src
import routes from './src/startup/router.js';

dotEnv.config()
const app = Express();
const PORT = process.env.PORT || 5000;

async function start(){
    try {

        await routes(app);
        
        app.listen(PORT, ()=>{
            console.log(`App running on port http://localhost:${PORT}/`);
        })
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start().then()