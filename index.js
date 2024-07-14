import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

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

app.post("/plant", (req, res) => {
    const { name, category, image, price, discription } = req.body;

    if (!name) {
        return res.json({
            success: false,
            data: null,
            message: "Name cannot be empty."
        });
    }

    if (!category) {
        return res.json({
            success: false,
            data: null,
            message: "Category cannot be empty."
        });
    }

    if (!price) {
        return res.json({
            success: false,
            data: null,
            message: "Price cannot be empty."
        });
    }

    if (!discription) {
        return res.json({
            success: false,
            data: null,
            message: "Description cannot be empty."
        });
    }

    if (!image) {
        return res.json({
            success: false,
            data: null,
            message: "Image cannot be empty."
        });
    }

    const randomId = Math.round(Math.random() * 10000);

    const newplant = {
        id: randomId,
        name: name,
        category: category,
        image: image,
        price: price,
        discription: discription
    };

    plants.push(newplant);

    res.json({
        success: true,
        data: newplant,
        message: "New plant added successfully."
    });
});

app.get("/plants", (req, res) => {
    res.json({
        success: true,
        data: plants,
        message: "All plants fetched successfully."
    });
});

app.get("/plant/:id", (req, res) => {
    const { id } = req.params;
    const plant = plants.find(p => p.id == id);

    res.json({
        success: plant ? true : false,
        data: plant || null,
        message: plant ? "Plant fetched successfully." : "Plant not found."
    });
});

app.put("/plant/:id", (req, res) => {
    const { id } = req.params;
    const { name, category, image, price, discription } = req.body;

    let plantFound = false;
    plants.forEach((plant, i) => {
        if (plant.id == id) {
            plant.name = name || plant.name;
            plant.category = category || plant.category;
            plant.image = image || plant.image;
            plant.price = price || plant.price;
            plant.discription = discription || plant.discription;
            plantFound = true;
        }
    });

    if (plantFound) {
        res.json({
            success: true,
            message: "Plant updated successfully."
        });
    } else {
        res.status(404).json({
            success: false,
            message: "Plant not found."
        });
    }
});
app.delete("/plant/:id", (req , res) =>{
   const {id} = req.params
    let index = -1

    plants.forEach((plant, i) => {
        if (plant.id === id) {
            index = i;
        }
    });
    
    if (index == -1) {
        return res.json ({
            success:true,
            message: `plants not found with index ${id}`
        })
    }

    plants.splice(index, i)
  res.json ({
    success:true,
    message: "plants deleted succesfully",
    data: null
  })  
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

