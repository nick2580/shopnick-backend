const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getCategoryById,
  createCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
  getCategory,
} = require("../controllers/category");
const { route } = require("./auth");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Actual Routers are here

//Create
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//Read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//Update
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//Delete
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);
module.exports = router;
