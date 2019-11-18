const express = require('express');
const router = express.Router();
const data = [];

router.get('/test', (req, res) => {
    res.send('it worked');
})

module.exports = router;

router.get('/item/all', (req,res) => {
    res.send(data);
});

router.get('/item/:index', (req, res) => {
    res.send(data[req.params.index]);
});

router.post('/item/:index', (req,res) => {
    data.push(req.params.index);
    //res.status(201).send();
    res.send(data);
});

router.put('/item/:index/:newData', (req, res) => {
    data[+req.params.index] = req.params.newData;
    res.send(data);
});

router.delete('/item/:index', (req, res) => {
    data.splice(+req.params.index, 1);
    res.send(data);
});

router.get('/home', (req, res) => {
    console.log('hello');
    res.status(500);
    res.send('Please work');
});

router.post('/page2', (req, res) => {
    console.log('world');
    res.status(500);
    res.send(req.body);
});

router.post('/page3', (req, res) => {
    console.log('!');
    res.status(500);
    res.send('Page 3');
});
