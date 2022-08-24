const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/issue.js')

issueRouter.get("/", (req, res, next) => {
    Issue.find((err, todos) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(todos)
    })
})

issueRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedIssue)
    })
})

issueRouter.get('/:issueId', (req, res, next) => {
  Issue.find(
      { _id: req.params.issueId, user: req.auth._id },
      (err, deletedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(deletedIssue)
      }
    )
})

issueRouter.post("/:userId", (req, res) => {
  
  Issue.find({writer: req.params.userId})
      .exec((err, userIssues) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, userIssues })
      })
})

issueRouter.post('/likes/:issueId', (req, res, next) => {
  if(req.body.variable){
      
  } else {
      req.body.variable
  } 
  Issue.findOneAndUpdate(
    {_id: req.params.issueId}, req.body,
      (err, updatedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully updated issue: ${updatedIssue}`)
      }
    )
})

issueRouter.delete('/:issueId', (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId, user: req.auth._id },
    (err, deletedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete todo: ${deletedIssue.title}`)
    }
  )
})

module.exports = issueRouter