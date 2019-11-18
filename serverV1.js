//initial server.js file before changing to seperate route files

const express = require('express');
const itemRouter = require('./item');
const Sequelize = require('sequelize');
const app = express();

var sequelize = new Sequelize(
    'test',                 // Database
    'root',                 // Username
    'password',             // Password
    {
        host: '127.0.0.1',  // Localhost address
        dialect: 'mysql'
    });

const Item = sequelize.define('item', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT
    },
    description: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER
    }
});

app.post('/add', async (req, res) => {
    await Item.create({ name: 'test1', price: 1.50, description: 'testing the description field', quantity: 20 });
    await Item.create({ name: 'test2', price: 1.50, description: 'testing the description field', quantity: 20 });
    await Item.create({ name: 'test2', price: 1.50});
    res.send('Added data to table!');
});

app.post('/addItem/:itemname/:itemprice/', async (req,res) =>{
    await Item.create({ name: req.params.itemname, price: req.params.itemprice})
    res.send('Item added wohoo!')
});

app.put('/update', async (req, res) => {
    await Item.update(
        { name: 'juice' },
        {
            where: {
                name: 'test1'
            }
        });
    res.send('Table updated!')
});

app.delete('/delete', async (req, res) => {
    await Item.destroy(
        {
            where:
            {
                name: 'juice'
            }
        });
    res.send('Data deleted!')
});

app.get('/findall', async (req, res) => {
    await Item.findAll().then(item => {
        res.send(item)
    })
    res.send("Found")
});

app.get('/finditem', async (req, res) => {
    const result = await Item.findAll({ where: { name: 'juice' } });
    res.send({
        message: 'Data found!',
        data: result
    });
});

Item.sync({ force: true });

app.use(express.json());

app.use((req, res, next) => {
    //console.log('Testing that this happens', req.url);
    next();
})

app.use('/item-router', itemRouter);

app.listen(8080);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });