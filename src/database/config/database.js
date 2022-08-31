import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dburl = `${process.env.DB_URL}`;
export const sequelize = new Sequelize(dburl);