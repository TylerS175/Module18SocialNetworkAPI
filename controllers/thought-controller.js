const { thought, user } = require('../models');

const thoughtController = {
    //Get all of the thoughts 
    getAllthought(req, res) {
        thought.find({})
        .populate({
            path: 'reactions',
            select: '-_v'
        })
        .select('-_v')
        .sort({_id: -1 })
        .then(dbthoughtData => res.json(dbthoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
}