import express from 'express';

import { postsController } from 'controllers/postsController';

const router = express.Router();

router
    .get('/', postsController.getList)
    .post('/', postsController.addItem)
    .get('/:id', postsController.getItem)
    .delete('/:id', postsController.deleteItem);

export default router;
