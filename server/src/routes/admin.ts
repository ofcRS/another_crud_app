const router = express.Router();

router.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="post"><input name="title"/> <button type="submit">add</button></form>')
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});