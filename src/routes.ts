import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer"
import { CreateUserController } from "./controllers/user/create-user-controller";
import { AuthUserController } from "./controllers/user/auth-user-controller";
import { DetailUserController } from "./controllers/user/detail-user-controller";
import { validateSchema } from "./middlewares/validateSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/create-category-controller";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/categorySchema";
import { ListCategoryController } from "./controllers/category/list-category-controller";
import { CreateProductController } from "./controllers/product/create-product-controller";
import { createProductSchema, disableProductSchema, listProductByCategorySchema, listProductSchema } from "./schemas/productSchema";
import { ListProductController } from "./controllers/product/list-product-controller";
import { DisableProductController } from "./controllers/product/disable-product-controller";
import { ListProductByCategoryController } from "./controllers/product/list-product-byCategory-controller";
import { ListOrderController } from "./controllers/order/list-order-controller";
import { addItemOrderSchema, createOrderSchema, deleteItemOrderSchema, deleteOrderSchema, detailOrderSchema, finishOrderSchema, sendOrderSchema } from "./schemas/orderSchema";
import { CreateOrderController } from "./controllers/order/create-order-controller";
import { AddItemOrderController } from "./controllers/order/add-item-order-controller";
import { DeleteItemOrderController } from "./controllers/order/delete-item-order-controller";
import { DetailOrderController } from "./controllers/order/detail-order-controller";
import { SendOrderController } from "./controllers/order/send-order-controller";
import { FinishOrderController } from "./controllers/order/finish-order-controller";
import { DeleteOrderController } from "./controllers/order/delete-order-controller";

const router = Router();
const upload = multer(uploadConfig)

// USER ROUTES
router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle);

router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle);

router.get("/me", isAuthenticated, new DetailUserController().handle)

// CATEGORY ROUTES
router.post("/category", isAuthenticated, isAdmin, validateSchema(createCategorySchema), new CreateCategoryController().handle)

router.get("/category", isAuthenticated, new ListCategoryController().handle)

// PRODUCT ROUTES
router.post("/product", isAuthenticated, isAdmin, upload.single("file"), validateSchema(createProductSchema), new CreateProductController().handle)

router.get("/products", isAuthenticated, validateSchema(listProductSchema), new ListProductController().handle)

router.delete("/product", isAuthenticated, isAdmin, validateSchema(disableProductSchema), new DisableProductController().handle)

router.get("/category/product", isAuthenticated, validateSchema(listProductByCategorySchema), new ListProductByCategoryController().handle)

// ORDER ROUTES
router.post("/order", isAuthenticated, validateSchema(createOrderSchema), new CreateOrderController().handle)

router.get("/orders", isAuthenticated, new ListOrderController().handle)

router.post("/order/add", isAuthenticated, validateSchema(addItemOrderSchema), new AddItemOrderController().handle)

router.delete("/order/remove", isAuthenticated, validateSchema(deleteItemOrderSchema), new DeleteItemOrderController().handle)

router.get("/order/detail", isAuthenticated, validateSchema(detailOrderSchema), new DetailOrderController().handle)

router.put("/order/send", isAuthenticated, validateSchema(sendOrderSchema), new SendOrderController().handle)

router.put("/order/finish", isAuthenticated, validateSchema(finishOrderSchema), new FinishOrderController().handle)

router.delete("/order", isAuthenticated, validateSchema(deleteOrderSchema), new DeleteOrderController().handle)

export default router;