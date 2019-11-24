import express from 'express';

import { PostController } from 'controllers/postController';

export const router = express.Router();

router
    .get('/posts', PostController.getList)
    .get('/posts/:id', PostController.getItem)
    .post('/posts', PostController.addItem)
    .delete('/posts/:id', PostController.deleteItem);
