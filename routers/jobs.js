const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

// Routes
// get jobs
router.get('/jobs', (_, res) => {
  Job.find({})
    .then(jobs => res.send(jobs))
    .catch(err => console.log("can't get jobs", err))
})

// get job
router.get('/jobs/:id', (req, res) => {
  const { id } = req.params
  Job.findById(id)
    .then(job => res.send(job))
    .catch(err => console.log("can't get this job", err))
})

// create job
router.post('/create', (req, res) => {
  const { title, description } = req.body
  Job.findOne({ title: title }).then(job => {
    if (job) {
      return res.send({ msg: 'this job already exists' })
    }
    Job.create({ title, description })
      .then(_ => res.send({ msg: 'job successfully created!' }))
      .catch(err => console.log('job creation failed', err))
  })
})

// save job
router.post('/save', (req, res) => {
  const { jobId, userId } = req.body
  Job.findByIdAndUpdate(jobId, { $push: { matches: { user: userId } } })
    .then(_ => res.send({ msg: 'job saved!' }))
    .catch(err => {
      console.log("job couldn't be saved", err)
      return res.send({ msg: 'job saved!' })
    })
})

// update job
router.put('/update/:id', (req, res) => {
  const { title, description } = req.body
  const { id } = req.params
  Job.findByIdAndUpdate(
    id,
    { $push: { title: title, description: description } },
    { new: true },
  )
    .then(job => {
      return res.send(job)
    })
    .catch(err => {
      console.log('job update failed', err)
      return res.send({ msg: 'job update failed' })
    })
})

// delete job
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params
  User.findByIdAndDelete(id)
    .then(_ => res.send({ msg: 'job successfully deleted!' }))
    .catch(err => {
      console.log('job deletion failed', err)
      return res.send({ msg: 'job deletion failed' })
    })
})

module.exports = router
