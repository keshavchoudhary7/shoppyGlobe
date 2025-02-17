import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { 
    CategoriesController, 
    createCategoryController, 
    deleteCategoryController, 
    singleCategoryController, 
    updateCategoryController 
} from '../controllers/categoryController.js';

const router = express.Router()

//  route
//create category
router.post(
    '/create-category',
    requireSignIn,isAdmin,
    createCategoryController
)
//update category

router.put('/update-category/:id',
    requireSignIn,isAdmin,
    updateCategoryController
)


//get all categories

router.get('/get-categories',
    CategoriesController
)
export default router;

//single category

router.get('/single-category/:slug',
    singleCategoryController
)

//delete category

router.delete('/delete-category/:id',
    requireSignIn,isAdmin,
    deleteCategoryController
)