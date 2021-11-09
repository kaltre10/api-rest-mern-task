const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    
    const token = req.header('x-auth-token');

    try {

        const validation = jwt.verify(token, process.env.SECRET);
        
        res.usuario = validation.payload;

        next();
        
    } catch (error) {
        return res.status(401).json({msg: "token no autorizado"});
    }

    

}

module.exports = auth;