const router = require("express").Router();
const Category = require("../models/category");

// Create a category
router.post("/add-category", async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const categoryExists = await Category.findOne({ categoryName: categoryName });
  if (categoryExists) {
    return res.status(400).json({ error: "Category already exists" });
  }
  const category = new Category({
    categoryName,
  });
  await category.save();
  return res.status(200).json({ message: "Category created successfully" });
});

module.exports = router;
