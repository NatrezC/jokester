const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/', (req, res) => {
    db.joke.findOrCreate({
        where: { setup: req.body.setup, punchline: req.body.punchline},
        include: [db.user]
    })
        .then(([foundOrCreatedJoke, created]) => {
            foundOrCreatedJoke.addUser(req.user)
            .then(createdRelation => {
            //res.render('favorites', {joke: foundOrCreatedJoke})
            res.redirect('/favorites')
        })
        }).catch(err => {
            console.log('this is wrong in fav post',err)
        })
})

//GET /favorites - return a page with favorited animals
router.get('/', (req, res) => {
    db.user.findOne({
    where: {id: req.user.id},
        include: [db.joke]
    })
    .then(foundUser => {
        // console.log(foundUser.pets)
        res.render('favorites', { favJokes: foundUser.jokes })
    })
    console.log('dddddd', req.user)
});
module.exports = router;