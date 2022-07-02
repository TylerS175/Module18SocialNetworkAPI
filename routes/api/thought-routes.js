const router = require("express").Router();

const {
    getAllthought, 
    getthoughtById,
    createthought,
    updatethought,
    deletethought,

} = require("../../controllers/thought-controller")

//API Thoughts 
router.route("/").get(getAllthought).post(createthought);

//API Thoughts by ID 
router 
    .route("/:id")
    .get(getthoughtById)
    .put(updatethought)
    .delete(deletethought);

// Need to create Reaction on thoughts 

module.exports = router;