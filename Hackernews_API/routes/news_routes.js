

const express = require('express');
const router = express.Router();
const auth = require("./../middleware/auth")
const News = require("./../models/news_schema");

router.post('/addnews', auth, async(req, res) => {
    try {
        const news = new News({
        title : req.body.title,
        date : req.body.date
    });
    console.log(req.body);
    res.json(news);
    await news.save();
    } catch (error) {
        res.send(error);
    }
});


router.get('/readnews',async (req, res) => {

    try {
        const news = await News.find({});
        res.status(2).json(news);
    } catch (error) {
        res.send(error);
    }
});

router.patch('/updatenews/:id',auth, async(req, res) => {

    try {
        const news = await News.findOneAndUpdate({_id: req.params.id} , req.body);
        const updated = await News.findById({_id:req.params.id});
        res.send(updated);
        news.save();
    } catch (error) {
        res.send(error);
    }
});

router.delete('/deletenews/:id',auth, async(req, res) => {

    try {
        const news = await News.findOneAndRemove({_id: req.params.id});
        res.json(news);

    } catch (error) {
        res.send(error);
    }
});

module.exports = router;