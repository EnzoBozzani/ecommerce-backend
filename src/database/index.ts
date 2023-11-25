import { Sequelize } from 'sequelize';

//@ts-ignore
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    define: {
        underscored: true
    }
});