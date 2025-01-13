import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleWare.js'
import { 
    createProductController, 
    deleteProductController, 
    getProductsController, 
    getSingleProductsController, 
    productCategoryConntroller, 
    productCountController, 
    productFilterController, 
    productListController,   
    productPhotoController,
    relatedProductController,
    searchProductController,
    updateProductController,
   
} from '../controllers/productController.js'

import  formidable from 'express-formidable'
const router = express.Router()

//routes
router.post('/create-product',
     requireSignIn,
     isAdmin, 
     formidable(), 
     createProductController
    )

//update-product routes

router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );

// get products route

router.get('/get-products', getProductsController)

//single product route
router.get('/get-products/:slug', getSingleProductsController)

//get images
router.get('/product-photo/:pid',productPhotoController)

//delete products

router.delete('/delete-product/:pid', deleteProductController)

// Filter product
router.post('/product-filter', productFilterController)

//product count 
router.get('/product-count',productCountController)

//product per page

router.get('/products-list/:page', productListController)

//Search Functionality

router.get('/search/:keyword',searchProductController)

//similar product route

router.get('/related-product/:pid/:cid', relatedProductController)

//category wise route

router.get('/product-category/:slug', productCategoryConntroller)

export default router;
