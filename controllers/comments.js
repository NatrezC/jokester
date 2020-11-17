const express = require('express')
const router = express.Router()
const db = require('../models')
const { route } = require('./auth')

router.get('/:jokeId', (req, res) => {
    console.log('right here ===>', req.params.id)
    db.userjoke.findOne({
        where: {userId: req.user.id, jokeId: req.params.jokeId}
    })
        .then(foundComment => {
        res.render('comments', {comment: foundComment.dataValues})
    })
})








module.exports = router;