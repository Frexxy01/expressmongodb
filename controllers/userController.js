const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel.js")
const User = require("../models/userModel.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser  = asyncHandler(async (req, res) => {
  const {username, email, password} = req.body
  if (!username || !email || !password) {
    res.status(400)
    throw new Error("All fields are mandatory!")
  }
  const userAvailable = await User.findOne({email})

  if (userAvailable) {
    res.status(400)
    throw new Error("Registered email already exists!")
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(hashedPassword)
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })
  console.log(user)
  if(user) {
    res.status(201).json({_id: user.id, email: user.email})
  } else {
    throw new Error("User data not valid")
  }
})

const loginUser  = asyncHandler(async (req, res) => {
  const {email, password} = req.body
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!")
  }
  const user = await User.findOne({email})
  //compare the passwords
  if (user && (await (bcrypt.compare(password, user.password)))) {
    const accesToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user.id
      }
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "100m"})
    res.status(200).json({accesToken})
  } else {
    res.status(401);
    throw new Error("Email or password not valid")
  }
})


const currentUser  = asyncHandler(async (req, res) => {
  res.json(req.user)
})

module.exports = { registerUser, loginUser, currentUser }