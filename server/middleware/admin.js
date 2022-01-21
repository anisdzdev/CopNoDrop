module.exports = function (req, res, next) {

    try {
        if(req.user.level===10){
            req.admin = true;
        }
        next();
    } catch (ex) {
        res.status(401).send('Invalid token.');
    }
}