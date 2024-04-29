import Express,{  Router } from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import productController from "../controllers/productController";
import {multer,storage} from "../middleware/multerMiddleware"
const upload=multer({storage:storage})
const router:Router=Express.Router()
router.route('/').post(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),upload.single('image'),productController.addProduct).get(productController.getProduct)
export default router