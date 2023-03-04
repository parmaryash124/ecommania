const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");
const categoryController = require("../controllers/categoryController");
const subCategoryController = require("../controllers/subCategoryController");
const productController = require("../controllers/productController");
const upload = require("../common/imageupload");
const orderController = require("../controllers/orderController");
const taxController = require("../controllers/taxController");
const couponController = require("../controllers/couponController");

router.get("/upload", authController.test);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/admin/test", auth.authorized, adminController.getUser);
router.post("/logout", auth.authorized, authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword", authController.resetPassword);

// edit profile
router.post("/editProfile", auth.authorized, authController.editProfile);

// category routes..

router.post(
  "/admin/addCategory",
  auth.authorized,
  auth.checkUserType,
  categoryController.addCategory
);
router.post(
  "/admin/editCategory",
  auth.authorized,
  auth.checkUserType,
  categoryController.editCategory
);
router.post(
  "/admin/deleteCategory",
  auth.authorized,
  auth.checkUserType,
  categoryController.deleteCategory
);
router.post(
  "/getCategories",
  auth.authorized,
  categoryController.getCategories
);
router.post(
  "/category/:categoryId",
  auth.authorized,
  categoryController.getCategoryById
);

// sub category routes.

router.post(
  "/admin/addSubCategory",
  auth.authorized,
  subCategoryController.addsubCategory
);
router.post(
  "/admin/editSubCategory",
  auth.authorized,
  subCategoryController.editsubCategory
);
router.post(
  "/admin/deleteSubCategory",
  auth.authorized,
  subCategoryController.deletesubCategory
);
router.post(
  "/getSubCategories",
  auth.authorized,
  subCategoryController.getSubCategories
);
router.post(
  "/subcategory/:subcategoryId",
  auth.authorized,
  subCategoryController.getsubCategoryById
);

// product releated routes..

router.post(
  "/product/addProduct",
  auth.authorized,
  auth.checkUserType,
  upload.single("file"),
  productController.addProduct
);

router.post(
  "/product/editProduct/:productId",
  auth.authorized,
  auth.checkUserType,
  upload.single("file"),
  productController.editProduct
);

router.post(
  "/product/deleteProduct",
  auth.authorized,
  auth.checkUserType,
  productController.deleteProduct
);

router.post(
  "/product/fetchProducts",
  auth.authorized,
  productController.fetchProducts
);

router.post("/product/:id", auth.authorized, productController.productbyId);

// order related routes.

router.post("/order/createOrder", auth.authorized, orderController.createOrder);

// coupon routes.

router.post(
  "/coupon/addcoupon",
  auth.authorized,
  auth.checkUserType,
  couponController.addCoupon
);

// tax related routes.

router.post(
  "/tax/createtax",
  auth.authorized,
  auth.checkUserType,
  taxController.createtax
);
router.post(
  "/tax/fetchtaxes",
  auth.authorized,
  auth.checkUserType,
  taxController.fetchTax
);
router.post(
  "/tax/edittax",
  auth.authorized,
  auth.checkUserType,
  taxController.editTax
);
router.post(
  "/tax/deletetax",
  auth.authorized,
  auth.checkUserType,
  taxController.deleteTax
);

module.exports = router;
