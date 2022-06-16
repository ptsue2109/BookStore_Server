const express = require("express");
const router = express.Router();
const {
  createAuthor,
  getAllAuthor,
  getOneAuthor,
  updateAuthor,
  removeAuthor,
  getBookByAuthor
} = require("../controllers/authorCtrler");

router.patch("/authors/update-author/:id", updateAuthor);
router.get("/authors/get-author-by-id/:id", getOneAuthor);
router.post("/authors/create-author", createAuthor);
router.get("/authors", getAllAuthor);
router.get("/authors/get-author-by-slug/:slug",getBookByAuthor)
router.delete("/authors/remove-author/:id", removeAuthor);
module.exports = router;
