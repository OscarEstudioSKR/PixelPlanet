const { Router } = require('express'),
    router = Router(),
    { db } = require('../db/db.json');

router.route('/')

    .get((req, res) => {
        res.json({db})
    })

    .put((req, res) => {
        db = req.body
        res.json({ db })
    })


module.exports = router;