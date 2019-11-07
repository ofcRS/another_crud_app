import express from 'express';

export const router = express.Router();

router.post('/post', (req, res, next) => {
    console.log(req);
    res.send({
        response: {
            meh: true
        }
    })
});
