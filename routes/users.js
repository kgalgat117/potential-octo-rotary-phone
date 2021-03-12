var express = require('express');
var router = express.Router();

var userModel = require('../model/user')
var userMiddleware = require('../middleware/user');
const { someAlgorithmReturnsEfficiencyBasedOnData, createAccessToken } = require('../controller/common');

// API to insert user details to db
router.post('/user/create', userMiddleware.validateCreateUserData, async function (req, res) {
  try {
    let token = createAccessToken(req.user.toJSON())
    res.status(200).json({ access_token: token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "something went wrong", error: JSON.stringify(error) })
  }
})

router.get('/validate/token', userMiddleware.validateUser, async function (req, res) {
  try {
    let temp = { ...req.user }
    delete temp.password
    res.status(200).json(temp)
  } catch (err) {
    res.status(400).json({ data: err, message: 'something went wrong' })
  }
})

router.post('/user/onboard', userMiddleware.validateUser, userMiddleware.validateOnboardData, async function (req, res) {
  try {
    if (req.body.calculateScore) {
      req.body.sleepScore = someAlgorithmReturnsEfficiencyBasedOnData(req.body)
    }
    await userModel.findOneAndUpdate({ _id: req.user._id }, { ...req.body })
    if (req.body.calculateScore) {
      res.status(200).json({ sleepScore: `${req.body.sleepScore} %` })
    } else {
      res.status(204).json({})
    }
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error: JSON.stringify(error) })
  }
})

module.exports = router;