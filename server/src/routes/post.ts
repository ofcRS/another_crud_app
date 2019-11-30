import express from 'express';

import { postsController } from 'controllers/postsController';

export const router = express.Router();

router
    .get('/posts', postsController.getList)
    .get('/posts/:id', postsController.getItem)
    .post('/posts', postsController.addItem)
    .delete('/posts/:id', postsController.deleteItem);
