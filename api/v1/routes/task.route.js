const express = require("express")
const router = express.Router();
const Taks = require("../../../models/taks.model")

router.get('/', async (req, res) => {
    const taks = await Taks.find({
        deleted : false
    });
    console.log(taks);

    res.json(taks)
})

module.exports = router;
