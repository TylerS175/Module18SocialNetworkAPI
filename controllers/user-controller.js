const { user } = require('../models');

const userController = {
    //get all Users
    getAlluser(req, res) {
        user.find({})
        .populate({
            path: "friends",
            select:"-__v",
        })
        .select("-__v")
        .sort({ _id: -1})
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // Get one user by id 
    getUserById({ params }, res) {
        user.findOne ({ _id: params.id })
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v")
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id! "});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // create user 
    createUser({ body }, res) {
        user.create(body) 
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },

    //Updating User by ID 
    updateUser({ parmas, body }, res) {
        user.findOneAndUpdate({ _id: params.id}, body, {
            new: true,
            runValidators: true, 
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
      // delete User
  deleteUser({ params }, res) {
    user.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $addToSet: { friends: params.friendId } },
          { new: true, runValidators: true }
        )
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user with this id" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
      },
    
      // delete friend
      removeFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: params.friendId } },
          { new: true }
        )
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: "No user with this id!" });
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
      },
};

module.exports = userController; 