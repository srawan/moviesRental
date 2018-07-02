
const config = require('config');
const jwt = require('jsonwebtoken');

function auths(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("access denied not token provided");
    try {
        const decoded = jwt.verify(token, config.get("jwtprivateKey"));
        req.user = decoded;
        next();
    } catch(ex) {
        res.status(400).send('invalid toekn');
    }
}
module.exports.auths = auths;