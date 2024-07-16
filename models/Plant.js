import { Schema , model } from "mongoose";

const plantschema = new Schema({
    name : String ,
    category : String ,
    image : String ,
    price : Number ,
    discription : String

})

const  Plant = model("Plant", plantschema)

export default Plant 