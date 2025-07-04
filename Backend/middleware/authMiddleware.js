const isAuth = (req,res,next)=>{
    if(!req.session.user){
        return res.status(401).json({message : "Unauthorized. Please log in First."});
    }
    next();
};
module.exports = {isAuth};