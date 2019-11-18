const express = require('express');
const cors = require('cors');
const dbRouter = require('./routes/db-routes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/find', dbRouter);

app.use((err, req, res, next) =>{
    res.status(500).send({
        error: 'Something went wrong',
        message: err
    });
});

app.listen(8080, () => {
    console.log('Server running on port 8080.')
});

module.exports = app;