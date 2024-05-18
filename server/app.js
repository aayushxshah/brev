const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;

const app = express();
app.use(cors());
app.use(morgan('tiny'));

const dbURI = `mongodb+srv://link-shortener:${dbPassword}@link-shortener.zkk3kzm.mongodb.net/link-shortener-database?retryWrites=true&w=majority&appName=link-shortener`
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to db');
        app.listen(3000);
        console.log('listening on port 3000');
    })
    .catch(err => console.error(err));

app.use(express.json());
app.use(bodyParser.json());

const userRouter = require('./src/routes/userRoutes');
app.use('/api/user', userRouter);

const linkRouter = require('./src/routes/linkRoutes');
app.use('/api/link', linkRouter);

const redirectRouter = require('./src/routes/redirectRoutes');
app.use('/api/redirect', redirectRouter);