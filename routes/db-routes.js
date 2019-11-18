const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("Hello, world!");
});

// Get all blog posts for all users
router.get('/all', async (_req, res) => {
    const result = await models.User.findAll({
        include: [
            {
                model: models.Blog
            }
        ]
    });
    res.send(result);
});

// Get all blog posts for specific user
router.get('/users/:name/:propertyKey?', async (req, res) => {
    const result = await models.User.findOne({
        where: { name: req.params.name },
        include: [
            {
                model: models.Blog
            }
        ]
    });
    if (result) {
        if (req.params.propertyKey) { // if the propertyKey param is provided only send back that property
            res.send({ [req.params.propertyKey]: result.get(req.params.propertyKey) });
        } else {
            res.send(result);
        }
    } else {
        res.status(404).send({ message: 'User not found for name ' + req.params.name });
    }
});

// Get blog with specific index
router.get('/blog/:index', async (req, res) => {
    const [first = null] = await models.Blog.findAll({ where: { id: req.params.index } });
    if (first) {
        res.send(first);
    } else {
        res.status(404).send({ message: 'Item not found for index ' + req.params.index });
    }
});

// Create a new user
router.post('/newuser', async (req, res) => {
    await models.User.create(req.body);
    res.send();
});

// Create new blog post linking to a user id
router.post('/blog', async (req, res) => {
    await models.Blog.create(req.body, { where: { userId: req.body.userId } });
    res.send();
});

// Update a blog post
router.put('/blog/:index', async (req, res) => {
    await models.Blog.update(req.body, { where: { id: req.params.index } });
    res.send("Updated!");
});

// Delete a blog post
router.delete('/remove/:index', async (req, res) => {
    models.Blog.destroy({ where: { id: req.params.index } });
    res.send("Deleted!");
});

module.exports = router;