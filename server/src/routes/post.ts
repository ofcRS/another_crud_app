import express from 'express';

export const router = express.Router();

router.post('/post', (req, res) => {
    res.send({
        test: true
    });
});
