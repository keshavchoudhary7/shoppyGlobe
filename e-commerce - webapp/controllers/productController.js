// import React from 'react'
import productModel from "../models/productModel.js";
import categoryModel from '../models/categoryModel.js'
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, price, description, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation

    switch (true) {
      case !name:
        return res.status(401).send({ message: "Name is Required" });

      case !description:
        return res.status(401).send({ message: "Description is Required" });
      case !price:
        return res.status(401).send({ message: "Price is Required" });
      case !category:
        return res.status(401).send({ message: "Category is Required" });
      case !quantity:
        return res.status(401).send({ message: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(401)
          .send({ message: "photo is Required & less than 1mb" });
      default:
        break;
    }

    const prod = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      prod.photo.data = fs.readFileSync(photo.path);
      prod.photo.contentType = photo.type;
    }
    await prod.save();
    res.status(201).send({
      success: true,
      product: prod,
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating product",
      error,
    });
  }
};

//get all products

export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All products",
      products,
      total: products.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
      success: false,
      message: "Error retrieving products",
    });
  }
};

//single product

export const getSingleProductsController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      product,
      message: "Product found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
      success: false,
      message: "Error retrieving product",
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    res.set("Content-Type", product.photo.contentType);
    res.send(product.photo.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving product photo",
    });
  }
};

//delete product controller

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting product",
      error,
    });
  }
};

//update product controller

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, price, description, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation

    switch (true) {
      case !name:
        return res.status(401).send({ message: "Name is Required" });

      case !description:
        return res.status(401).send({ message: "Description is Required" });
      case !price:
        return res.status(401).send({ message: "Price is Required" });
      case !category:
        return res.status(401).send({ message: "Category is Required" });
      case !quantity:
        return res.status(401).send({ message: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(401)
          .send({ message: "photo is Required & less than 1mb" });
      default:
        break;
    }

    const prod = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      prod.photo.data = fs.readFileSync(photo.path);
      prod.photo.contentType = photo.type;
    }
    await prod.save();
    res.status(201).send({
      success: true,
      product: prod,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product",
      error,
    });
  }
};

//Filter controller

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
      success: false,
      message: "Error retrieving products",
    });
  }
};

export const productCountController = async (req,res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
      success: false,
      message: "Error retrieving product count",
    });
  }
};

// single page controller

export const productListController = async (req,res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const product = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products: product,
        
      })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
      success: false,
      message: "Error retrieving product list",
    });
  }
};

export const searchProductController = async (req,res)=>{
    try {
        const {keyword} = req.params
        const result = await productModel.find({
            $or:[
                {name: {$regex :keyword, $options:'i'}},
                {description: {$regex :keyword, $options:'i'}},
            ]
        }).select('-photo')
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error.message,
            success: false,
            message: "Error searching product",
        })
    }
}


// similar product 
export const relatedProductController = async(req,res)=>{
  try {
    const  {pid,cid} = req.params
    const products = await productModel.find({
      category: cid,
      _id: { $ne: pid },
    }).select("-photo").limit(30).populate("category")
    res.status(200).send({
      success: true,
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      error: error.message,
      success: false,
      message: "Error retrieving related products",
    })
  }
}


export const productCategoryConntroller = async(req,res)=>{
  try {
    const category = await categoryModel.findOne({slug:req.params.slug})
    const products = await productModel.find({category}).populate("category");
    res.status(200).send({
      success: true,
      products,
      category
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      error: error.message,
      success: false,
      message: "Error retrieving product categories",
    })
  }
}