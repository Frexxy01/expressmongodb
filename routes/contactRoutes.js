const express = require("express")
const router = express.Router();
const {
  getContacts,
  postContact, 
  getSingleContact, 
  putContact, 
  deleteContact
} = require("../controllers/contactController.js");
const validateToken = require("../middleware/validateTokenHandler.js");


router.use(validateToken)
router.route("/").get(getContacts).post(postContact)

router.route("/:id").get(getSingleContact).put(putContact).delete(deleteContact)

module.exports = router