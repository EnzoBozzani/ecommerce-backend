import AdminJS from "adminjs";
import AdminJSExpress from '@adminjs/express';
//@ts-ignore
import * as AdminJSSequelize from '@adminjs/sequelize';
import { sequelize } from "../database";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
    databases: [sequelize],
    rootPath: '/admin',
    branding: {
        companyName: 'Your Ecommerce',
        logo: '/logo.png',
        theme: {
            colors: {
                primary100: '#8800FF',
                primary80: '#9216FF',
                primary60: '#9E31FF',
                primary40: '#AB4BFF',
                primary20: '#B560FF',
                grey100: '#151515',
                grey80: '#333333',
                grey60: '#4d4d4d',
                grey40: '#666666',
                grey20: '#dddddd',
                filterBg: '#333333',
                accent: '#151515',
                hoverBg: '#151515',
            }
        }
    }
})

//exportamos também o router para o adminJs, essa função buildRouter
//constrói um router baseado nas configurações passadas (adminJs)
export const adminJsRouter = AdminJSExpress.buildRouter(adminJs);