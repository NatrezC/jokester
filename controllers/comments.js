const express = require('express')
const router = express.Router()
const db = require('../models')
const { route } = require('./auth')

router.get('/:jokeId', (req, res) => {
    db.userjoke.create({
        where: {userId: req.user.id, jokeId: req.params.jokeId}
    })
    .then(foundComment => {
        res.render('comments', {comment: foundComment.dataValues})
        console.log('comment here ===>', comment)
    })
})








module.exports = router;