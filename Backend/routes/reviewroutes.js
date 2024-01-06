const express = require("express");
const {
  createProductReview,
  getAllreview,
  deleteReview
} = require("../controllers/reviewcontroller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();


router.route("/new/review").post(createProductReview);

router.route("/all/review").get(getAllreview);

router.route("/admin/reviewdelete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteReview);

module.exports = router;