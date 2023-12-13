require('dotenv').config();
import express from 'express';
import { sequelize } from './database';
import { router } from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		console.log(`Server started successfully at port ${PORT}`);
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
});
