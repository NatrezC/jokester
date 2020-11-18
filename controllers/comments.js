const express = require('express')
const router = express.Router()
const db = require('../models')
const { route } = require('./auth')
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/:jokeId', isLoggedIn, (req, res) => {
    db.userjoke.findOne({
        where: {userId: req.user.id, jokeId: req.params.jokeId}
    })
    .then(foundComment => {
        res.render('comments', {comment: foundComment.dataValues})
        console.log('comment here ===>', comment)
    })
})








module.exports = router;