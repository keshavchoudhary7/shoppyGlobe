import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify'

export const createCategoryController = async (req,res) => {
  try{
    const {name} = req.body;
    if(!name){
        return res.status(401).send({ 
            message: "Name is Required" });
    }
    const existingCategory = await categoryModel.findOne({name});
    if(existingCategory){
        return res.status(200).send({
            success: false,
            message: "Category already exists" });
    }
    const category = await new categoryModel({name,slug:slugify(name)}).save()
    res.status(201).send({
        success: true,
        message: "Category created successfully",
        category
    });
  }catch(error){
    console.log(error);
    res.status(500).send({ 
        success: false,
        message: "Error creating category", 
        error 
    });
  }
}


// update category

export const updateCategoryController = async (req,res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{
            name,
            slug:slugify(name)},
            {new:true}
        )
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category
        })
    }catch (error){
        console.log(error);
        res.status(500).send({ 
            success: false,
            message: "Error updating category", 
            error 
        });
    }
};

//get all category
export const CategoriesController = async (req,res)=>{
    try{
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            category
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({ 
            success: false,
            message: "Error fetching categories", 
            error 
        });
    }
}


//single category

export const singleCategoryController = async (req,res) => {
    try{
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            category,
            message:"fetching single category success!"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({ 
            success: false,
            message: "Error fetching category", 
            error 
        });
    }
};

// delete category 
export const deleteCategoryController = async(req,res)=>{
    try{
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
        

    }catch(error){
        console.log(error);
        res.status(500).send({ 
            success: false,
            message: "Error deleting category", 
            error 
        });
    }
} 
