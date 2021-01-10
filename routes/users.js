import express from 'express';

const router = express.Router();

const users = [
  {
    FirstName: "Hong",
    lastName: "Kyung Won",
    age: 27
  },
  {
    FirstName: "Kim",
    lastName: "Se Hwan",
    age: 26  
  },
]

// all routes in here are starting with /users
router.get('/', (req, res) => {
  res.send(users);
});

export default router;