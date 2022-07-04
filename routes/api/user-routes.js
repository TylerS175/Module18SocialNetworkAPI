const router = require("express").Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
    
} = require("../../controllers/user-controller")

//API Users 
router.route("/").get(getAllUser).post(createUser);

//API Users with ID
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Need create Friends ID
router.route("userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router; 