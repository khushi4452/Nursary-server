import Plant from "../models/plant.js";

const postplant = async (req, res) => {
    const { name, category, image, price, description } = req.body;

    const newplant = new Plant({
        name: name,
        category: category,
        image: image,
        description: description,
        price: price
    });

    const savedPlant = await newplant.save();

    res.json({
        success: true,
        data: savedPlant,
        message: "New plant added successfully."
    });
};


const getplants = async (req, res) => {
    console.log('GET /plants called');
    try {
        const plants = await Plant.find();
        res.json({
            success: true,
            data: plants,
            message: "All plants fetched successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch plants.",
            error: error.message
        });
    }
};
const getplantid = async (req, res) => {
    const { id } = req.params;
    try {
        const plant = await Plant.findOne({ _id: id });

        if (!plant) {
            return res.status(404).json({
                success: false,
                message: "Plant not found."
            });
        }

        res.json({
            success: true,
            data: plant,
            message: "Plant fetched successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the plant.",
            error: error.message
        });
    }
};
const putplantid = async (req, res) => {
    const { name, category, image, description, price } = req.body;
    const { id } = req.params;

    try {
        const updateResult = await Plant.updateOne(
            { _id: id },
            {
                $set: {
                    name: name,
                    category: category,
                    image: image,
                    description: description,
                    price: price
                }
            }
        );

        if (updateResult.nModified === 1) {
            res.json({
                success: true,
                message: "Plant updated successfully.",
                data: updateResult
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Plant not found or no changes made."
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the plant.",
            error: error.message
        });
    }
};


const deleteplantid = async(req,res)=>{
    const {id}=req.params
    
    await  Plant.deleteOne({_id:id})
  
    
       res.json({
          success:true,
          message:"Plant Deleted Successfully",
          data:null 
       })
    
}


export {postplant, 
    getplants,
    getplantid,
    putplantid,
    deleteplantid
}