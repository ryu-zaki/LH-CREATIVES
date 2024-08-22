const crypto = require('crypto');

const hashPassword = (req, _, next) => {
    const {username, password} = req.body;
    const text = username.concat(password);

    const hash = crypto.createHash("md5").update(text).digest("hex");
    req.hashPass = hash;
    next();
} 

module.exports = {hashPassword};