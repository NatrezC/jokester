const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')
const { route } = require('./auth')


router.post('/', isLoggedIn, (req, res) => {
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

//GET favorites route
router.get('/', isLoggedIn, (req, res) => {
    db.user.findOne({
    where: {id: req.user.id},
        include: [db.joke]
    })
    .then(foundUser => {
        // console.log(foundUser.pets)
        res.render('favorites', { favJokes: foundUser.jokes })
    })
    //console.log('dddddd', req.user)
});

//delete route
router.delete('/:id', isLoggedIn, (req, res) => {
    db.userjoke.destroy({
        where: { id: req.params.id }
    })
    .then(idDelete => {
        console.log(idDelete)
        res.redirect('/favorites')
    }).catch(err => {
        res.send(err)
    })
})

router.put('/:id', isLoggedIn, (req, res) => {
    db.userjoke.update(
        {comment: req.body.comment},
        {where: { userId: req.user.id, jokeId: req.params.id }
        }).then(newComment => {
            console.log("Comment here===>>>>", newComment)
            res.redirect(`/comments/${req.params.id}`)
        })
})



module.exports = router;