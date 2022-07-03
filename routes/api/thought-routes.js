const router = require("express").Router();

const {
    getAllthought, 
    getthoughtById,
    createthought,
    updatethought,
    deletethought,
    addReaction,
    removeReaction,

} = require("../../controllers/thought-controller")

//API Thoughts 
router.route("/").get(getAllthought).post(createthought);

//API Thoughts by ID 
router 
    .route("/:id")
    .get(getthoughtById)
    .put(updatethought)
    .delete(deletethought);

// API Thoughts in reference to Thought ID, reactions 
router.route("/:thoughtId/reactions").post(addReaction);

// API thoughts with ThoughtID, Reaction, ReactionID
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;