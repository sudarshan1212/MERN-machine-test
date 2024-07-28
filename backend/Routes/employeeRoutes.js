const express = require("express");
const {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/", protect, getEmployee);
router.post("/create", protect, createEmployee);

router
  .route("/:id")

  .put(protect, updateEmployee)
  .delete(protect, deleteEmployee);
module.exports = router;
