require('dotenv').config();

import express from 'express';
import { sequelize } from './database';
import { adminJs, adminJsRouter } from './admin';

const app = express();

app.use(adminJs.options.rootPath, adminJsRouter);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Server started successfully at port ${PORT}
        AdminPanel at: localhost:3000/admin
        `);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})