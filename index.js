import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose';

import { gethealth } from './controllers/health.js';
import { postplant ,
    getplants,
    getplantid,
    putplantid,
    deleteplantid
} from './controllers/plant.js';

import { controllerspagenotfound } from './controllers/error.js'

const app = express();

app.use(express.json());

const dbconnection  = async()=>{
 const conn = await mongoose.connect("mongodb+srv://Khushi:nafis%402580@khushi.w8uwzar.mongodb.net/Nursery-server")
 if(conn){
    console.log('MongoDB connected 😊')
 }

 else{
    console.log('MongoDB not connected ❌')
 }
 
}

dbconnection();



app.get("/health",gethealth )


app.post("/plant",postplant )


app.get("/plants",getplants )
    

app.get("/plant/:id",getplantid) 

app.put("/plant/:id",putplantid) 

app.delete("/plant/:id",deleteplantid )


app.use("*",controllerspagenotfound )



const PORT = process.env.PORT  || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

