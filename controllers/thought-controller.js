const { thought } = require('../models');

const thoughtController = {
  //Get all of the thoughts 
  getAllthought(req, res) {
    thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbthoughtData => res.json(dbthoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Get one thought by id 
  getthoughtById({ params }, res) {
    thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(dbthoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // Create thoughts 
  createthought({ body }, res) {
    thought.create(body)
      .then(dbthoughtData => res.json(dbthoughtData))
      .catch(err => res.json(err));
  },
  //Update thought by id 
  updatethought({ params, body }, res) {
    thought.findOneandUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbthoughtData => {
        if (!dbthoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  // delete thought 
  deletethought({ params }, res) {
    thought.findoneandDelete({ _id: params.id })
      .then(dbthoughtData => {
        if (!dbthoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
      })
      .catch(err => res.status(400).json(err));
  },
  // Add reaction
  addReaction({ parmas, body }, res) {
    thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch((err) => res.json(err));
    },
      // Delete Reaction
    removeReaction({ params }, res) {
      thought.findOneAndUpdate(
        { _id: parmas.thoughtId },
        { $pull: { reactions: { reactionId: parmas.reactionId } } },
        { new: true }
      )
      .then((dbthoughtData) => res.json(dbthoughtData))
      .catch((err) => res.json(err));
    },
      
};

  module.exports = thoughtController;