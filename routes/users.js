import express from 'express';

const router = express.Router();

const users = [
  {
    firstName: "Hong",
    lastName: "Kyung Won",
    age: 27
  },
  {
    firstName: "Kim",
    lastName: "Se Hwan",
    age: 26  
  },
]

// all routes in here are starting with /users
router.get('/', (req, res) => {
  res.send(users);
});

router.post('/', (req, res) => {
  const user = req.body;

  users.push(user);

  res.send(`User with the name ${user.firstName} added to database!`);
});

export default router;