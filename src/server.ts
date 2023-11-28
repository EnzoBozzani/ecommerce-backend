require('dotenv').config();
import express from 'express';
import { sequelize } from './database';

const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Server started successfully at port ${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})