const router = require("express").Router();

const {
    getAllThought, 
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,

} = require("../../controllers/thought-controller")

//API Thoughts 
router.route("/").get(getAllThought).post(createThought);

//API Thoughts by ID 
router 
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// API Thoughts in reference to Thought ID, reactions 
router.route("/:thoughtId/reactions").post(addReaction);

// API thoughts with ThoughtID, Reaction, ReactionID
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;