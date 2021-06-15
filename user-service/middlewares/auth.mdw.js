const jwt = require("jsonwebtoken");
const {jwtKey} = require("../configs/JWT.config");
module.exports = function (req, res, next) {
    const authHeader = req.headers["authorization"];
    
    if (authHeader) {
        try {
            const decoded = jwt.verify(authHeader, jwtKey);
            console.log(decoded);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Invalid access token'
            });
        }    
    } else {
        return res.status(400).json({
            message: 'Chưa đăng nhập'
        });
    }

    /* const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({
            msg: "Chưa đăng nhập",
        });
    }
    console.log(token);

    jwt.verify(token, jwtKey, async (err, result) => {
        if (err || !result) {
            return res.status(401).json({ msg: "Token không hợp lệ" });
        }

        req.user = result;
        next();
    }); */
};
