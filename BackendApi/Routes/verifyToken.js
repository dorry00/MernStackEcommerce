const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader
        jwt.verify(token, process.env.JWT_SECRET_PHRASE, (err,user)=>{
            if(err) {
                return res.status(403).json("Invalid token");
            }

            
            req.user = user;
            next();
        })
    }
    else{
        return res.status(401).json("user not authenticated")
    }



}

const verifyTokenAndAuthorisation = (req,res,next) => {
    verifyToken( req, res, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }
        else{
            return res.status(401).json("not allowed")
        }
    })

}

const verifyTokenAndAdmin =(req,res,next)=>{
    verifyToken( req, res, () =>{
    if(req.user.isAdmin){
        next()
    }
    else{
        return res.status(401).json("Only admin can do this")
    }
})


}





module.exports = {verifyToken,verifyTokenAndAuthorisation,verifyTokenAndAdmin}