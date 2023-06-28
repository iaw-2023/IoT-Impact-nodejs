// loginReactRoutes.js
const express = require("express");
const router = express.Router();
const { db } = require("../db/connection");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await db.query('SELECT * FROM "usersReact" WHERE email = $1', [email]);

    if (user.length > 0 && await bcrypt.compare(password, user[0].password)) {
      // Password matches, handle successful login
      return res.status(200).json({ message: 'Login successful' });
    } else {
      // Password does not match or user not found
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
     // Handle any errors that occurred during the process
     console.error('Error occurred during login:', error);

     let message = 'An error occurred during login';
 
     if (error.code === 'ECONNREFUSED') {
       message = 'Failed to connect to the database';
     } else if (error instanceof SomeSpecificError) {
       message = 'Some specific error occurred';
     }
     
     return res.status(500).json({ message });
  }

});

module.exports = router;
