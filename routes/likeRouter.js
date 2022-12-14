const express = require('express');
const router = express.Router();

const Issue = require('../models/issue.js')
const  Like  = require("../models/like");
const  Dislike  = require("../models/dislike")

router.post("/getLikes", (req, res) => {

    
    if(req.body.issueId) {
        variable = { issueId: req.body.issueId}
    } else {
        variable = { commentId: req.body.commentId}
    }
    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })


})


router.post("/getDislikes", (req, res) => {

    if(req.body.issueId) {
        variable = { issueId: req.body.issueId, userId: req.body.userId}
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId}
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })

})


router.post("/upLike", (req, res) => {

    if(req.body.issueId) {
        variable = { issueId: req.body.issueId, userId: req.body.userId}
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId}
    }
    const like = new Like(variable)
    //save the like information data in MongoDB
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        //In case disLike Button is already clicked, we need to decrease the dislike by 1 
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })

})




router.post("/unLike", (req, res) => {

    if(req.body.issueId) {
        variable = { issueId: req.body.issueId, userId: req.body.userId}
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId}
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

})


router.post("/unDisLike", (req, res) => {

    if(req.body.issueId) {
        variable = { issueId: req.body.issueId, userId: req.body.userId}
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId}
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })


})

router.post("/upDisLike", (req, res) => {

    if(req.body.issueId) {
        variable = { issueId: req.body.issueId, userId: req.body.userId}
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId}
    }
    const disLike = new Dislike(variable)
    //save the like information data in MongoDB
    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        //In case Like Button is already clicked, we need to decrease the like by 1 
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })


})

module.exports = router;