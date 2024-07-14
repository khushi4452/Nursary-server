import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

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

const plants = [
    {
        "id": 5,
        "name": "Bamboo tree",
        "category": "indoor",
        "image": "https://m.media-amazon.com/images/I/416LO2x7DFL.jpg",
        "price": "200",
        "discription": "bamboo represents the wood element"
    },
    {
        "id": 2,
        "name": "Rose",
        "category": "outdoor",
        "image": "https://m.media-amazon.com/images/I/416LO2x7DFL.jpg",
        "price": "200",
        "discription": "rose a beautiful plant"
    },
    {
        "id": 3,
        "name": "Mango",
        "category": "indoor",
        "image": "https://m.media-amazon.com/images/I/416LO2x7DFL.jpg",
        "price": "250",
        "discription": "mango a special tree"
    }
];



app.get("/health",gethealth )


app.post("/plant",postplant )


app.get("/plants",getplants )
    

app.get("/plant/:id",getplantid) 

app.put("/plant/:id",putplantid) 

app.delete("/plant/:id",deleteplantid )


app.use("*",controllerspagenotfound )



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

