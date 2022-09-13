var express = require('express');
var router = express.Router();

var { validateUserData } = require('../validation/users')

const userList = [];

/* GET users listing. */
router.get('/all', (req, res) => {
  res.send('respond with a resource');
});

router.get('/single', (req, res) => {
  res.json()({
    success: true,
    user: "Single User"
  })
})


router.post(',create-one', (req, res) => {
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const age = req.body.age
  const favoriteFood = req.body.favoriteFood

  const userData = {
    email,
    firstName,
    lastName,
    age,
    favoriteFood,
    fullName: firstName + lastName,
    createdAt: new Date(),
    lastModified: new Date()
  }
  const userDataCheck = validateUserData(userData);

  if (userDataCheck.isValid === false){
    res.json({
      success: false,
      message: userDataCheck.message
    })
    return;
  }

  userList.push(userData)

  console.log("userList", userList)

  res.json({
    success: true
  })
})

module.exports = router;
