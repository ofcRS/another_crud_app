import express from 'express';

import checkJwt from 'middlewares/checkJwt';
import { postsController } from 'controllers/postsController';

const router = express.Router();

router
    .get('/', postsController.getList)
    .post('/', checkJwt(postsController.addItem))
    .get('/:id', postsController.getItem)
    .delete('/:id', checkJwt(postsController.deleteItem));

export default router;
