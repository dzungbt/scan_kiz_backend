import db from "../models/index";
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();

let createBlog = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            // console.log(data.listFile[0]);
            let newBlog = await db.blog.create({
                title: data.title,
                content: data.content,
            });

            if (newBlog) {
                dataResponse.errCode = 0;
                dataResponse.newCate = newBlog;
                dataResponse.message = 'Create complete';

            } else {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not create';
            }
            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}


let getBlogById = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            let blog = await db.blog.findByPk(data.blogId);

            if (blog) {
                dataResponse.errCode = 0;
                dataResponse.blog = blog;
                dataResponse.message = 'Create complete';

            } else {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not create';
            }
            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}


module.exports = {
    createBlog: createBlog,
    getBlogById: getBlogById,
}