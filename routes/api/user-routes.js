const router = require("express").Router();
const {
    getAlluser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    
} = require("../../controllers/user-controller")

//API Users 
router.route("/").get(getAlluser).post(createUser);

//API Users with ID
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Need create Friends ID

module.exports = router; 