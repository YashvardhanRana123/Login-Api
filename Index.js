const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require("./db/User");
const jwt = require('jsonwebtoken')

const Jwt = require("jsonwebtoken");
const jwtkey = 'e-comm';

const app = express();
app.use(express.json());
app.use(cors());

app.post("/login", async (req, resp) => {
   console.log(req.body)
   if (req.body.password && req.body.email) {
      let user = await User.findOne(req.body).select("-password");
      if (user) {
         Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
               resp.send({ result: " Something is Wrong Please try later" })
            }
            resp.send({ user, auth: token })
         })

      }
      else {
         resp.send({ result: " not found" })
      }
   }
   else {
      resp.send({ result: "user not found" })
   }


})
