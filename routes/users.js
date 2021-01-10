import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = [
    {
    firstName: "Kim",
    lastName: "Se Hwan",
    age: 26,
    id: "d51d66bb-fda7-4671-ba95-28ff754b482a"
    },
    {
    firstName: "Hong",
    lastName: "Kyund Won",
    age: 27,
    id: "23fb6643-f748-45a7-a0aa-ed1533160eaf"
    }
];

// all routes in here are starting with /users
router.get('/', (req, res) => {
  res.send(users);
});

router.post('/', (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`User with the name ${user.firstName} added to database!`);
});


// /users/2 ==> req.params { id: 2 }
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`User with the id ${id} deleted from the database.`);
});

export default router;