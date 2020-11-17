const express = require('express')
const router = express.Router()
const db = require('../models')
const { route } = require('./auth')

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

//GET favorites route
router.get('/', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
    db.userjoke.update({
        comment: req.body.comment
    },
        {
            where: { userId: req.user.id, jokeId: req.params.id }
        }).then(newComment => {
            console.log("this is my comment", newComment)
            res.redirect(`/comments/${req.params.id}`)
        })
})



module.exports = router;