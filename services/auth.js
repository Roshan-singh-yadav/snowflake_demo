const jwt = require("jsonwebtoken")

module.exports = {
    refreshTokens: [],

    // accessTokens
    generateAccessToken: function(user) {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "360m" })
    },

    // refreshTokens
    generateRefreshToken: function(user) {
        const refreshToken =
            jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "20m" })
        this.refreshTokens.push(refreshToken)
        return refreshToken
    },

    validateToken: function (req, res, next) {
        //get token from request header
        const authHeader = req.headers["authorization"]
        if (authHeader == null) {
            // 4.6.2 Allow for development mode bypass of token validation
            res.status(400).send("Auth header not present")
            return
        }
        const token = authHeader.split(" ")[1]
        //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
        if (token == null) res.status(400).send("Token not present")
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(403).send("Token invalid")
            }
            else {
                req.user = user
                next()            
            }
        });
    },
};
